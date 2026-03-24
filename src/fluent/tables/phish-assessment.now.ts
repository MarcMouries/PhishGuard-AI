import '@servicenow/sdk/global'
import { 
  Table, 
  StringColumn, 
  ChoiceColumn, 
  DateTimeColumn, 
  ReferenceColumn,
  BooleanColumn 
} from '@servicenow/sdk/core'

/**
 * SAFER Framework Phishing Assessment Table
 * 
 * This table stores comprehensive phishing analysis results using the SAFER framework:
 * S - Sender Address analysis (display name vs domain, typosquatting, spoofing)
 * A - Attachments/Links analysis (suspicious files, hidden URLs, shortened links) 
 * F - Feelings analysis (urgency, fear, confusion, curiosity triggers)
 * E - External Email Tag analysis (presence and context)
 * R - Report generation (overall score, record creation, security alerts)
 */
export const x_snc_phishguard_assessment = Table({
  name: 'x_snc_phishguard_assessment',
  label: 'Phish Assessment',
  
  // Table configuration
  display: 'email_subject',
  accessible_from: 'package_private', // Only accessible within PhishGuard AI scope
  actions: ['create', 'read', 'update', 'delete'],
  audit: true, // Track all changes for security purposes
  
  schema: {
    // ==================== EMAIL METADATA FIELDS ====================
    
    // FORWARDED EMAIL (the email sent to isthissafe@service-now.com)
    forwarded_email_record: ReferenceColumn({
      label: 'Forwarded Email Record',
      referenceTable: 'sys_email',
      active: true
    }),
    
    forwarded_email_date: DateTimeColumn({
      label: 'Forwarded Email Date',
      active: true
    }),
    
    reported_by: ReferenceColumn({
      label: 'Reported By',
      referenceTable: 'sys_user',
      active: true
    }),
    
    reporter_email_address: StringColumn({
      label: 'Reporter Email Address',
      maxLength: 255,
      active: true
    }),
    
    // ORIGINAL EMAIL BEING ANALYZED (the phishing email)
    email_subject: StringColumn({
      label: 'Email Subject',
      maxLength: 500,
      mandatory: true,
      active: true
    }),
    
    sender_display_name: StringColumn({
      label: 'Sender Display Name',
      maxLength: 255,
      active: true
    }),
    
    sender_email: StringColumn({
      label: 'Sender Email',
      maxLength: 255,
      active: true
    }),
    
    sender_domain: StringColumn({
      label: 'Sender Domain',
      maxLength: 255,
      active: true
    }),
    
    email_received_date: DateTimeColumn({
      label: 'Email Received Date',
      active: true
    }),
    
    email_body: StringColumn({
      label: 'Email Body',
      maxLength: 4000,
      active: true
    }),
    
    email_record: ReferenceColumn({
      label: 'Email Record',
      referenceTable: 'sys_email',
      active: true
    }),

    // ==================== SAFER SCORE FIELDS ====================
    
    // S - Sender Address Analysis
    safer_s_risk: ChoiceColumn({
      label: 'SAFER S - Sender Risk Level',
      dropdown: 'dropdown_with_none',
      active: true,
      choices: {
        high: { label: 'HIGH', sequence: 0 },
        medium: { label: 'MEDIUM', sequence: 1 },
        low: { label: 'LOW', sequence: 2 }
      }
    }),
    
    safer_s_notes: StringColumn({
      label: 'SAFER S - Sender Analysis Notes',
      maxLength: 1000,
      active: true
    }),
    
    // A - Attachments/Links Analysis
    safer_a_risk: ChoiceColumn({
      label: 'SAFER A - Attachments/Links Risk Level',
      dropdown: 'dropdown_with_none',
      active: true,
      choices: {
        high: { label: 'HIGH', sequence: 0 },
        medium: { label: 'MEDIUM', sequence: 1 },
        low: { label: 'LOW', sequence: 2 }
      }
    }),
    
    safer_a_notes: StringColumn({
      label: 'SAFER A - Attachments/Links Analysis Notes',
      maxLength: 1000,
      active: true
    }),
    
    // F - Feelings/Urgency Analysis
    safer_f_risk: ChoiceColumn({
      label: 'SAFER F - Feelings/Urgency Risk Level',
      dropdown: 'dropdown_with_none',
      active: true,
      choices: {
        high: { label: 'HIGH', sequence: 0 },
        medium: { label: 'MEDIUM', sequence: 1 },
        low: { label: 'LOW', sequence: 2 }
      }
    }),
    
    safer_f_notes: StringColumn({
      label: 'SAFER F - Feelings/Urgency Analysis Notes',
      maxLength: 1000,
      active: true
    }),
    
    // E - External Email Tag Analysis
    safer_e_risk: ChoiceColumn({
      label: 'SAFER E - External Email Tag Risk Level',
      dropdown: 'dropdown_with_none',
      active: true,
      choices: {
        high: { label: 'HIGH', sequence: 0 },
        medium: { label: 'MEDIUM', sequence: 1 },
        low: { label: 'LOW', sequence: 2 }
      }
    }),
    
    safer_e_notes: StringColumn({
      label: 'SAFER E - External Email Tag Analysis Notes',
      maxLength: 1000,
      active: true
    }),

    // ==================== OVERALL RESULT FIELDS ====================
    
    safer_overall_score: ChoiceColumn({
      label: 'SAFER Overall Risk Score',
      dropdown: 'dropdown_with_none',
      mandatory: true,
      active: true,
      choices: {
        high: { label: 'HIGH', sequence: 0 },
        medium: { label: 'MEDIUM', sequence: 1 },
        low: { label: 'LOW', sequence: 2 }
      }
    }),
    
    safer_summary: StringColumn({
      label: 'SAFER Analysis Summary',
      maxLength: 4000,
      active: true
    }),
    
    analysis_run_date: DateTimeColumn({
      label: 'Analysis Run Date',
      default: 'javascript:gs.nowDateTime()',
      active: true
    }),
    
    flow_execution_id: StringColumn({
      label: 'Flow Execution ID',
      maxLength: 255,
      active: true
    }),

    // ==================== DISPOSITION FIELDS ====================
    
    disposition: ChoiceColumn({
      label: 'Disposition',
      dropdown: 'dropdown_without_none',
      default: 'under_review',
      mandatory: true,
      active: true,
      choices: {
        confirmed_phish: { label: 'Confirmed Phish', sequence: 0 },
        false_positive: { label: 'False Positive', sequence: 1 },
        under_review: { label: 'Under Review', sequence: 2 },
        escalated: { label: 'Escalated', sequence: 3 }
      }
    }),
    
    security_team_notified: BooleanColumn({
      label: 'Security Team Notified',
      default: false,
      active: true
    }),
    
    reviewed_by: ReferenceColumn({
      label: 'Reviewed By',
      referenceTable: 'sys_user',
      active: true
    }),
    
    review_notes: StringColumn({
      label: 'Review Notes',
      maxLength: 2000,
      active: true
    })
  }
})