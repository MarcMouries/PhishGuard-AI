import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

/**
 * Phish Assessment List View Configuration
 * 
 * Creates the proper list columns for the assessment table showing:
 * 1. Email Received Date
 * 2. Sender Email 
 * 3. Email Subject
 * 4. Forwarded Email Record (link)
 */

// Clear existing list layout and create new one
export const clear_default_list = Record({
  $id: Now.ID['clear_default_list'],
  table: 'sys_ui_list',
  data: {
    name: 'x_snc_phishguard_assessment',
    view: 'Default view',
    element: 'sys_id',
    position: 999,
    label: 'Clear List'
  }
})

// Create the desired list columns
export const col_email_received_date = Record({
  $id: Now.ID['col_email_received_date'],
  table: 'sys_ui_list',
  data: {
    name: 'x_snc_phishguard_assessment',
    view: 'Default view',
    element: 'email_received_date',
    position: 0,
    label: 'Email Received Date'
  }
})

export const col_sender_email = Record({
  $id: Now.ID['col_sender_email'],
  table: 'sys_ui_list',
  data: {
    name: 'x_snc_phishguard_assessment',
    view: 'Default view',
    element: 'sender_email',
    position: 1,
    label: 'Sender Email'
  }
})

export const col_email_subject = Record({
  $id: Now.ID['col_email_subject'],
  table: 'sys_ui_list',
  data: {
    name: 'x_snc_phishguard_assessment',
    view: 'Default view',
    element: 'email_subject',
    position: 2,
    label: 'Email Subject'
  }
})

export const col_forwarded_email_record = Record({
  $id: Now.ID['col_forwarded_email_record'],
  table: 'sys_ui_list',
  data: {
    name: 'x_snc_phishguard_assessment',
    view: 'Default view',
    element: 'email_record',
    position: 3,
    label: 'Email'
  }
})