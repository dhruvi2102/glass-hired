import PageLayout from '@/components/layout/PageLayout';

const Privacy = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Privacy <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-muted-foreground mb-8">Last updated: December 2024</p>

          <div className="glass-card p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Name, email address, and contact information</li>
                <li>Resume, work history, and professional qualifications</li>
                <li>Job preferences and search history</li>
                <li>Account credentials and profile information</li>
                <li>Communications with employers and our support team</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Match job seekers with relevant job opportunities</li>
                <li>Facilitate communication between job seekers and employers</li>
                <li>Send you job alerts and relevant notifications</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>With employers when you apply for a job or express interest</li>
                <li>With service providers who assist in our operations</li>
                <li>In response to legal requests or to protect our rights</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
                <li>With your consent or at your direction</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
              <p className="text-muted-foreground">
                We take reasonable measures to help protect your personal information from loss, theft, misuse, 
                unauthorized access, disclosure, alteration, and destruction. We use industry-standard encryption 
                and security protocols to safeguard your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access and receive a copy of your personal data</li>
                <li>Update or correct your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Cookies</h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to collect information about your browsing activities. 
                You can manage your cookie preferences through your browser settings. Please note that disabling cookies 
                may affect the functionality of our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our service is not intended for individuals under the age of 16. We do not knowingly collect personal 
                information from children under 16. If we become aware that we have collected personal information from 
                a child under 16, we will take steps to delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. We will notify you of any changes by posting 
                the new privacy policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@jobportal.com" className="text-primary hover:underline">
                  privacy@jobportal.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Privacy;
