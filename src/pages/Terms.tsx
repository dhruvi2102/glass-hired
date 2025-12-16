import PageLayout from '@/components/layout/PageLayout';

const Terms = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Terms & <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Conditions</span>
          </h1>
          <p className="text-muted-foreground mb-8">Last updated: December 2024</p>

          <div className="glass-card p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using JobPortal, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by these terms, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
              <p className="text-muted-foreground mb-4">
                Permission is granted to temporarily access the materials (information or software) on JobPortal for personal, 
                non-commercial transitory viewing only.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained on JobPortal</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. User Accounts</h2>
              <p className="text-muted-foreground">
                When you create an account with us, you must provide accurate, complete, and current information. 
                You are responsible for safeguarding your password and for all activities that occur under your account. 
                You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Job Postings</h2>
              <p className="text-muted-foreground">
                Employers posting jobs on JobPortal agree that all job listings must be accurate, non-discriminatory, 
                and comply with all applicable employment laws. We reserve the right to remove any job posting that 
                violates these terms or our community guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. User Content</h2>
              <p className="text-muted-foreground">
                You retain ownership of any content you submit, post, or display on or through the Service. 
                By submitting content, you grant JobPortal a worldwide, non-exclusive, royalty-free license to use, 
                reproduce, modify, and display such content in connection with the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Disclaimer</h2>
              <p className="text-muted-foreground">
                The materials on JobPortal are provided on an 'as is' basis. JobPortal makes no warranties, 
                expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, 
                implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
                of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitations</h2>
              <p className="text-muted-foreground">
                In no event shall JobPortal or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                to use the materials on JobPortal, even if JobPortal or a JobPortal authorized representative has been 
                notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms & Conditions, please contact us at{' '}
                <a href="mailto:legal@jobportal.com" className="text-primary hover:underline">
                  legal@jobportal.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Terms;
