const Footer = () => {
  return (
    <div className='w-full bg-gray-50 py-10'>
      <div className='w-full mx-auto text-[#4F4F4F] text-xs flex flex-col items-center'>
        <div className='w-3/5 flex justify-between items-center'>
          <p className='m-0'>Power of friendship™</p>
          <div>
            <a className='px-5' href=''>
              About
            </a>
            <a className='px-5' href=''>
              Contact
            </a>
            <a className='px-5' href=''>
              My nigga
            </a>
          </div>
        </div>
        <hr className='my-4 ml-0 mr-0 w-3/5 text-[#4F4F4F] font-extralight' />
        <div className='w-3/5 font-extralight'>
          By continuing past this page, you agree to our Terms of Service,
          Cookie Policy, Privacy Policy and Content Policies. All trademarks are
          properties of their respective owners. 2018-2021 © Power of
          friendship™ Ltd. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;