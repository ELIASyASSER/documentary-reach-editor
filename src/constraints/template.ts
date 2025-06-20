export const templates = [
  {
    id: "blank",
    label: "blank document",
    imageUrl: "/blank-document.svg",
    initialContent: ``,
  },
  {
    id: "business letter",
    label: "business letter",
    imageUrl: "/business-letter.svg",
    initialContent: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">
        <p style="text-align: right; margin: 0 0 8px 0;">
          [Your Name]<br/>
          <span>[Your Address]</span><br/>
          <span>[City, State ZIP Code]</span>
        </p>
        <p style="text-align: right; margin: 0 0 16px 0;">[Date]</p>

        <p style="margin: 0 0 16px 0;">
          [Recipient Name]<br/>
          <span>[Company Name]</span><br/>
          <span>[Company Address]</span><br/>
          <span>[City, State ZIP Code]</span>
        </p>

        <p style="margin: 0 0 16px 0;">Dear [Recipient Name],</p>

        <p style="margin: 0 0 16px 0;">
          I am writing to express my interest in establishing a professional relationship with your company. Our team specializes in providing high-quality services that align with your organization's mission and values.
        </p>

        <p style="margin: 0 0 16px 0;">
          We would be honored to meet and further discuss how we can support your business goals. Thank you for considering our proposal.
        </p>

        <p style="margin: 0;">
          Sincerely,<br/>
          <span>[Your Name]</span>
        </p>
      </div>
    `,
  },
  {
    id: "resume letter",
    label: "resume letter",
    imageUrl: "/resume.svg",
    initialContent: `
      <div style="font-family: Helvetica, sans-serif; font-size: 14px; line-height: 1.5;">
        <h2 style="margin: 0 0 4px 0;">[Your Name]</h2>
        <p style="margin: 0 0 16px 0;">[Your Address] | [Phone Number] | [Email]</p>

        <h3 style="margin: 16px 0 8px 0;">Objective</h3>
        <p style="margin: 0 0 16px 0;">
          Motivated professional seeking a challenging role where I can apply my skills and grow professionally.
        </p>

        <h3 style="margin: 16px 0 8px 0;">Experience</h3>
        <p style="margin: 0 0 8px 0;">
          <strong>Job Title</strong> – Company Name<br/>
          <span>[Start Date] – [End Date]</span>
        </p>
        <ul style="margin: 0 0 16px 20px; padding: 0;">
          <li style="margin-bottom: 4px;">Responsibility 1</li>
          <li>Responsibility 2</li>
        </ul>

        <h3 style="margin: 16px 0 8px 0;">Education</h3>
        <p style="margin: 0;">
          <strong>Degree</strong> – University Name<br/>
          <span>[Year]</span>
        </p>
      </div>
    `,
  },
  {
    id: "cover letter",
    label: "cover letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
      <div style="font-family: Georgia, serif; font-size: 15px; line-height: 1.6;">
        <p style="margin: 0 0 8px 0;">
          [Your Name]<br/>
          <span>[Your Address]</span><br/>
          <span>[Email] | [Phone]</span>
        </p>
        <p style="margin: 0 0 16px 0;">[Date]</p>

        <p style="margin: 0 0 16px 0;">
          [Hiring Manager's Name]<br/>
          <span>[Company Name]</span><br/>
          <span>[Company Address]</span>
        </p>

        <p style="margin: 0 0 16px 0;">Dear [Hiring Manager's Name],</p>

        <p style="margin: 0 0 16px 0;">
          I am excited to apply for the [Job Title] position at [Company Name]. With my background in [Your Background], I am confident that I can contribute positively to your team.
        </p>

        <p style="margin: 0 0 16px 0;">
          Enclosed is my resume for your review. I would welcome the opportunity to discuss how I can be a valuable asset to your company.
        </p>

        <p style="margin: 0 0 16px 0;">Thank you for your time and consideration.</p>

        <p style="margin: 0;">
          Sincerely,<br/>
          <span>[Your Name]</span>
        </p>
      </div>
    `,
  },
  {
    id: "software proposal",
    label: "software proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `
      <div style="font-family: Tahoma, sans-serif; font-size: 14px; line-height: 1.6;">
        <h2 style="margin: 0 0 16px 0;">Software Development Proposal</h2>
        <p style="margin: 0 0 8px 0;"><strong>Prepared for:</strong> [Client Name]</p>
        <p style="margin: 0 0 16px 0;"><strong>Prepared by:</strong> [Your Company Name]</p>

        <h3 style="margin: 16px 0 8px 0;">Project Overview</h3>
        <p style="margin: 0 0 16px 0;">
          This proposal outlines a plan for developing a software solution tailored to [Client's] needs.
        </p>

        <h3 style="margin: 16px 0 8px 0;">Scope of Work</h3>
        <ul style="margin: 0 0 16px 20px; padding: 0;">
          <li style="margin-bottom: 4px;">Requirement Analysis</li>
          <li style="margin-bottom: 4px;">Design & Architecture</li>
          <li style="margin-bottom: 4px;">Development & Testing</li>
          <li>Deployment & Support</li>
        </ul>

        <h3 style="margin: 16px 0 8px 0;">Timeline</h3>
        <p style="margin: 0 0 16px 0;">Estimated completion: [Number] weeks from project start.</p>

        <h3 style="margin: 16px 0 8px 0;">Cost Estimate</h3>
        <p style="margin: 0 0 16px 0;">Total cost: $[Amount]</p>

        <p style="margin: 0;">We look forward to collaborating with you.</p>
      </div>
    `,
  },
  {
    id: "project proposal",
    label: "project proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
      <div style="font-family: Verdana, sans-serif; font-size: 14px; line-height: 1.6;">
        <h2 style="margin: 0 0 16px 0;">Project Proposal</h2>
        <p style="margin: 0 0 8px 0;"><strong>Project Name:</strong> [Project Title]</p>
        <p style="margin: 0 0 8px 0;"><strong>Author:</strong> [Your Name]</p>
        <p style="margin: 0 0 16px 0;"><strong>Date:</strong> [Date]</p>

        <h3 style="margin: 16px 0 8px 0;">Introduction</h3>
        <p style="margin: 0 0 16px 0;">
          This project aims to address [Problem] by implementing [Solution].
        </p>

        <h3 style="margin: 16px 0 8px 0;">Goals</h3>
        <ul style="margin: 0 0 16px 20px; padding: 0;">
          <li style="margin-bottom: 4px;">Goal 1</li>
          <li style="margin-bottom: 4px;">Goal 2</li>
          <li>Goal 3</li>
        </ul>

        <h3 style="margin: 16px 0 8px 0;">Budget & Timeline</h3>
        <p style="margin: 0 0 8px 0;">Estimated Budget: $[Amount]</p>
        <p style="margin: 0 0 16px 0;">Timeline: [Start Date] – [End Date]</p>

        <h3 style="margin: 16px 0 8px 0;">Conclusion</h3>
        <p style="margin: 0;">
          We believe this project will have a significant impact and we are excited to move forward.
        </p>
      </div>
    `,
  },
];
