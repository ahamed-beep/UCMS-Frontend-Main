import { useState, useEffect } from 'react'
import axiosInstance from '../../../Api/axiosInstance'
import { Link } from 'react-router-dom'

const UpcomingClasses = () => {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axiosInstance.get('/upcoming-classes', {
          params: { status: 'active', limit: 6, page: 1 },
        })
        setClasses(res.data.data.data)
      } catch {
      } finally {
        setLoading(false)
      }
    }
    fetchClasses()
  }, [])

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-PK', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

  if (loading) {
    return (
      <section>
        <div className='w-full md:mt-16 mt-10'>
          <h3 className='font-inter font-bold text-[24px] md:text-[36px] text-[#0A0A0A] text-center wrap-break-word'>
            Upcoming IELTS/PTE Classes
          </h3>
          <div className='w-[90%] md:w-[85%] mx-auto my-6 md:my-10 lg:my-15'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='flex flex-col gap-3 p-5 border border-[#F3F4F6] shadow-xl rounded-[14px] animate-pulse'>
                  <div className='h-4 bg-gray-200 rounded w-1/2' />
                  <div className='h-5 bg-gray-200 rounded w-3/4' />
                  <div className='h-4 bg-gray-200 rounded w-1/3' />
                  <div className='h-10 bg-gray-200 rounded-[10px]' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (classes.length === 0) {
    return (
      <section>
        <div className='w-full md:mt-16 mt-10'>
          <h3 className='font-inter font-bold text-[24px] md:text-[36px] text-[#0A0A0A] text-center'>
            Upcoming  Classes
          </h3>
          <p className='text-center text-[#64748b] mt-8'>No upcoming classes at the moment.</p>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className='w-full md:mt-16 mt-10'>
        <h3 className='font-inter font-bold text-[24px] md:text-[36px] text-[#0A0A0A] text-center'>
          Upcoming  Classes
        </h3>
        <div className='w-[90%] md:w-[85%] mx-auto my-6 md:my-10 lg:my-15'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5'>
            {classes.map((item) => (
              <div key={item.id} className='flex flex-col gap-3 p-5 border border-[0.8px] border-[#F3F4F6] shadow-xl rounded-[14px]'>
                <div className='flex gap-2'>
                  <img src='/Images/Calendar.png' alt='calendar' width={20} height={20} />
                  <p className='font-inter font-medium text-[12px] md:text-[14px] text-[#0F4C8A]'>
                    {formatDate(item.date)}
                  </p>
                </div>
                <h4 className='font-inter font-semibold text-[15px] md:text-[18px] text-[#0A0A0A]'>
                  {item.title}
                </h4>
                <p className='font-inter font-medium text-[12px] md:text-[14px] text-[#FF6B35]'>
                  {item.spotsLeft} spots left
                </p>
                <Link to="/consultation">

                <button className='w-full font-inter font-normal text-[14px] md:text-[16px] text-center text-white rounded-[10px] bg-[#0F4C8A] py-2'>
                  Register Now
                </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default UpcomingClasses