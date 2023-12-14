import React from 'react'

export default function PrivacyPolicies() {
  return (
    <div className='max-w-screen-md mx-auto py-10 space-y-8 px-4'>
      <div>
        <h1 className='text-5xl font-bold text-center'>Privacy policy</h1>
        <p className='text-center mt-2 text-muted-foreground'>Welcome to Finuncle</p>
      </div>

      <p>
        At Finuncle, we are committed to safeguarding your privacy. This Privacy Policy outlines how we collect, use,
        and protect your personal information. By using our website, you consent to the practices described in this
        policy.
      </p>

      <div className='space-y-4'>
        <h1 className='text-2xl font-bold'>Information We Collect</h1>

        <div>
          <h2 className='text-lg font-medium'>Personal Information</h2>
          <p className='text-muted-foreground'>
            When you use our services, we may collect personal information such as your name, email address, and any
            other details you provide voluntarily. This information is used solely for the purpose of enhancing your
            experience with our website and services.
          </p>
        </div>

        <div>
          <h2 className='text-lg font-medium'>Non-Personal Information</h2>
          <p className='text-muted-foreground'>
            We may also collect non-personal information, such as browser type, IP address, and the pages you visit.
            This data helps us analyze trends, improve our services, and administer the site.
          </p>
        </div>
      </div>

      <div className='space-y-4'>
        <h1 className='text-2xl font-bold'>How We Use Your Information</h1>
        <p className='text-muted-foreground'>
          We do not sell, trade, or otherwise transfer your personal information to outside parties. Your data is used
          for the following purposes:
        </p>

        <ul className='text-muted-foreground'>
          <li>- To personalize your experience on our website.</li>
          <li>- To improve our website based on your feedback.</li>
          <li>- To send periodic emails regarding updates and promotions (if you subscribe).</li>
        </ul>
      </div>

      <div className='space-y-4'>
        <h1 className='text-2xl font-bold'>Data Security</h1>
        <p className='text-muted-foreground'>
          We take the security of your information seriously. We implement a variety of security measures to maintain
          the safety of your personal information. Your data is stored in a secure environment accessible only to
          authorized personnel.
        </p>
      </div>

      <div className='space-y-4'>
        <h1 className='text-2xl font-bold'>Cookies</h1>
        <p className='text-muted-foreground'>
          We use cookies to enhance your experience on our site. Cookies are small files that a site or its service
          provider transfers to your computer&apos;s hard drive through your web browser. These cookies enable the
          site&apos;s systems to recognize your browser and capture and remember certain information.
        </p>
      </div>

      <div className='space-y-4'>
        <h1 className='text-2xl font-bold'>Third-Party Disclosure</h1>
        <p className='text-muted-foreground'>
          We do not sell, trade, or otherwise transfer your personal information to third parties. This does not include
          trusted third parties who assist us in operating our website, conducting our business, or servicing you, as
          long as those parties agree to keep this information confidential.
        </p>
      </div>

      <div className='space-y-4'>
        <h1 className='text-2xl font-bold'>Changes to Our Privacy Policy</h1>
        <p className='text-muted-foreground'>
          If we decide to change our privacy policy, we will post those changes on this page. It is your responsibility
          to review this policy periodically to stay informed about how we are protecting your information.
          <br />
          By using our website, you consent to our privacy policy.
        </p>
      </div>

      <p>Last Updated: 14-12-2023</p>
    </div>
  )
}
