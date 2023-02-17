import { serve } from 'inngest/next';
import autoPayment from '../../inngest/autoPayment';

export default serve('Family Dashboard', [autoPayment]);
