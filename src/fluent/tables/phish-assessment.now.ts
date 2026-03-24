import '@servicenow/sdk/global'
import { 
    Table, 
    StringColumn, 
    DateColumn, 
    ReferenceColumn, 
    IntegerColumn, 
    BooleanColumn 
} from '@servicenow/sdk/core'

// PhishGuard AI Assessment Table - Stores comprehensive analysis of forwarded emails
export const x_snc_phishguard_assessment = Table({
    name: 'x_snc_phishguard_assessment',
    label: 'Phish Assessment',
    schema: {
        // === FORWARDED EMAIL INFORMATION ===
        // The email sent by company employee to security team
        forwarded_email_record: ReferenceColumn({ 
            label: 'Forwarded Email Record', 
            referenceTable: 'sys_email',
            hint: 'Reference to the email forwarded to the security team'
        }),
        forwarded_email_date: DateColumn({ 
            label: 'Forwarded Email Date',
            hint: 'When the employee forwarded the email to security team' 
        }),
        reported_by: ReferenceColumn({ 
            label: 'Reported By', 
            referenceTable: 'sys_user',
            hint: 'Company employee who forwarded the suspicious email'
        }),
        reporter_email_address: StringColumn({ 
            label: 'Reporter Email Address', 
            maxLength: 255,
            hint: 'Email address of the employee who reported'
        }),

        // === ORIGINAL EMAIL INFORMATION ===
        // The suspicious email being analyzed
        email_record: ReferenceColumn({ 
            label: 'Email', 
            referenceTable: 'sys_email',
            hint: 'Reference to the original suspicious email record'
        }),
        email_subject: StringColumn({ 
            label: 'Email Subject', 
            maxLength: 500,
            hint: 'Subject line of the suspicious email'
        }),
        sender_email: StringColumn({ 
            label: 'Sender Email', 
            maxLength: 255,
            hint: 'Email address of the suspicious sender'
        }),
        sender_display_name: StringColumn({ 
            label: 'Sender Display Name', 
            maxLength: 255,
            hint: 'Display name shown for the sender'
        }),
        sender_domain: StringColumn({ 
            label: 'Sender Domain', 
            maxLength: 255,
            hint: 'Domain extracted from sender email address'
        }),
        email_received_date: DateColumn({ 
            label: 'Email Received Date',
            hint: 'When the suspicious email was originally received'
        }),
        email_body: StringColumn({ 
            label: 'Email Body', 
            maxLength: 8000,
            hint: 'Content/body of the suspicious email'
        }),

        // === SAFER ANALYSIS RESULTS ===
        // Comprehensive security assessment using SAFER framework
        safer_score: IntegerColumn({ 
            label: 'SAFER Score',
            hint: 'Overall security risk score (0-100)'
        }),

        // S - Sender Analysis
        sender_reputation: StringColumn({ 
            label: 'Sender Reputation', 
            maxLength: 50,
            choices: {
                trusted: { label: 'Trusted', sequence: 0 },
                unknown: { label: 'Unknown', sequence: 1 },
                suspicious: { label: 'Suspicious', sequence: 2 },
                malicious: { label: 'Malicious', sequence: 3 }
            },
            hint: 'Assessment of sender trustworthiness'
        }),
        sender_score: IntegerColumn({ 
            label: 'Sender Score (S)',
            hint: 'Sender analysis component score'
        }),

        // A - Attachment Analysis  
        attachment_risk: StringColumn({ 
            label: 'Attachment Risk', 
            maxLength: 50,
            choices: {
                none: { label: 'No Attachments', sequence: 0 },
                safe: { label: 'Safe', sequence: 1 },
                suspicious: { label: 'Suspicious', sequence: 2 },
                dangerous: { label: 'Dangerous', sequence: 3 }
            },
            hint: 'Risk level of email attachments'
        }),
        attachment_score: IntegerColumn({ 
            label: 'Attachment Score (A)',
            hint: 'Attachment analysis component score'
        }),

        // F - Features Analysis (Email characteristics)
        features_risk: StringColumn({ 
            label: 'Features Risk', 
            maxLength: 50,
            choices: {
                normal: { label: 'Normal', sequence: 0 },
                suspicious: { label: 'Suspicious', sequence: 1 },
                highly_suspicious: { label: 'Highly Suspicious', sequence: 2 }
            },
            hint: 'Risk based on email features and characteristics'
        }),
        features_score: IntegerColumn({ 
            label: 'Features Score (F)',
            hint: 'Email features analysis component score'
        }),

        // E - External Links Analysis
        external_links_risk: StringColumn({ 
            label: 'External Links Risk', 
            maxLength: 50,
            choices: {
                none: { label: 'No External Links', sequence: 0 },
                safe: { label: 'Safe', sequence: 1 },
                suspicious: { label: 'Suspicious', sequence: 2 },
                malicious: { label: 'Malicious', sequence: 3 }
            },
            hint: 'Risk level of external links in email'
        }),
        external_links_score: IntegerColumn({ 
            label: 'External Links Score (E)',
            hint: 'External links analysis component score'
        }),

        // R - Recipient Analysis
        recipient_targeting: StringColumn({ 
            label: 'Recipient Targeting', 
            maxLength: 50,
            choices: {
                mass: { label: 'Mass Distribution', sequence: 0 },
                targeted: { label: 'Targeted', sequence: 1 },
                spear_phishing: { label: 'Spear Phishing', sequence: 2 }
            },
            hint: 'Type of targeting used in the email'
        }),
        recipient_score: IntegerColumn({ 
            label: 'Recipient Score (R)',
            hint: 'Recipient targeting analysis component score'
        }),

        // === ASSESSMENT RESULTS ===
        threat_level: StringColumn({ 
            label: 'Threat Level', 
            maxLength: 50,
            choices: {
                safe: { label: 'Safe', sequence: 0 },
                low: { label: 'Low Risk', sequence: 1 },
                medium: { label: 'Medium Risk', sequence: 2 },
                high: { label: 'High Risk', sequence: 3 },
                critical: { label: 'Critical Risk', sequence: 4 }
            },
            hint: 'Overall threat assessment level'
        }),

        is_phishing: BooleanColumn({ 
            label: 'Is Phishing',
            hint: 'Determined to be a phishing attempt'
        }),

        confidence_level: StringColumn({ 
            label: 'Confidence Level', 
            maxLength: 50,
            choices: {
                low: { label: 'Low Confidence', sequence: 0 },
                medium: { label: 'Medium Confidence', sequence: 1 },
                high: { label: 'High Confidence', sequence: 2 },
                very_high: { label: 'Very High Confidence', sequence: 3 }
            },
            hint: 'Confidence in the assessment results'
        }),

        // === WORKFLOW STATUS ===
        assessment_status: StringColumn({ 
            label: 'Assessment Status', 
            maxLength: 50,
            choices: {
                pending: { label: 'Pending Analysis', sequence: 0 },
                analyzing: { label: 'Analyzing', sequence: 1 },
                completed: { label: 'Analysis Complete', sequence: 2 },
                reviewed: { label: 'Security Reviewed', sequence: 3 },
                closed: { label: 'Closed', sequence: 4 }
            },
            defaultValue: 'pending',
            hint: 'Current status of the phishing assessment'
        }),

        security_action_taken: StringColumn({ 
            label: 'Security Action Taken', 
            maxLength: 100,
            choices: {
                none: { label: 'No Action Required', sequence: 0 },
                quarantine: { label: 'Email Quarantined', sequence: 1 },
                block_sender: { label: 'Sender Blocked', sequence: 2 },
                user_training: { label: 'User Training Scheduled', sequence: 3 },
                investigation: { label: 'Further Investigation', sequence: 4 }
            },
            hint: 'Action taken by security team'
        }),

        analysis_notes: StringColumn({ 
            label: 'Analysis Notes', 
            maxLength: 4000,
            hint: 'Detailed notes from the security analysis'
        }),

        processed_date: DateColumn({ 
            label: 'Processed Date',
            hint: 'When the assessment was completed'
        })
    }
})