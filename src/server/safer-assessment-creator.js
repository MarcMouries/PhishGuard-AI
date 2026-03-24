import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide'

/**
 * SAFER Assessment Creator
 * 
 * This script handles the creation of SAFER phishing assessment records
 * from email processing flow data.
 * 
 * @param {string} emailSysId - The sys_id of the sys_email record
 * @param {string} flowExecutionId - Flow execution ID for traceability
 * @returns {string} sys_id of created assessment record or null if failed
 */
export function createSaferAssessment(emailSysId, flowExecutionId) {
  try {
    // Get the email record to extract metadata
    var emailGr = new GlideRecord('sys_email');
    if (!emailGr.get(emailSysId)) {
      gs.error('PhishGuard AI: Email record not found: ' + emailSysId);
      return null;
    }
    
    // Extract sender domain from email address
    var senderEmail = emailGr.getValue('from') || '';
    var senderDomain = '';
    if (senderEmail.indexOf('@') > -1) {
      senderDomain = senderEmail.split('@')[1];
    }
    
    // Create assessment record
    var assessmentGr = new GlideRecord('x_snc_phishguard_assessment');
    assessmentGr.initialize();
    
    // Email Metadata fields
    assessmentGr.setValue('email_subject', emailGr.getValue('subject') || '');
    assessmentGr.setValue('sender_display_name', emailGr.getValue('from_name') || '');
    assessmentGr.setValue('sender_email_address', senderEmail);
    assessmentGr.setValue('sender_domain', senderDomain);
    assessmentGr.setValue('email_received_date', emailGr.getValue('sys_created_on'));
    assessmentGr.setValue('email_record', emailSysId);
    
    // Flow execution tracking
    assessmentGr.setValue('flow_execution_id', flowExecutionId || '');
    
    // Set current timestamp for analysis
    var currentTime = new GlideDateTime();
    assessmentGr.setValue('analysis_run_date', currentTime.getDisplayValue());
    
    // Initial disposition
    assessmentGr.setValue('disposition', 'under_review');
    assessmentGr.setValue('security_team_notified', false);
    
    // Placeholder SAFER analysis - will be enhanced later with actual logic
    assessmentGr.setValue('safer_overall_score', 'medium');
    assessmentGr.setValue('safer_summary', 'Initial assessment created from email processing flow. Awaiting detailed SAFER analysis.');
    
    // Placeholder individual SAFER scores
    assessmentGr.setValue('safer_s_risk', 'medium');
    assessmentGr.setValue('safer_s_notes', 'Sender analysis pending');
    assessmentGr.setValue('safer_a_risk', 'medium');
    assessmentGr.setValue('safer_a_notes', 'Attachment/Link analysis pending');
    assessmentGr.setValue('safer_f_risk', 'medium');
    assessmentGr.setValue('safer_f_notes', 'Feelings/Urgency analysis pending');
    assessmentGr.setValue('safer_e_risk', 'medium');
    assessmentGr.setValue('safer_e_notes', 'External tag analysis pending');
    
    var assessmentSysId = assessmentGr.insert();
    
    if (assessmentSysId) {
      gs.info('PhishGuard AI: SAFER assessment created: ' + assessmentSysId + ' for email: ' + emailSysId);
      return assessmentSysId;
    } else {
      gs.error('PhishGuard AI: Failed to create SAFER assessment for email: ' + emailSysId);
      return null;
    }
    
  } catch (ex) {
    gs.error('PhishGuard AI: Error creating SAFER assessment: ' + ex.message);
    return null;
  }
}