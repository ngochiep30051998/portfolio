'use client'

import { createClient } from '@/lib/supabase/client';
import type { LandingConfig } from '@/lib/config/landing';
import { defaultLandingConfig } from '@/lib/config/landing';

export const landingAdminService = {
  async getConfig(): Promise<LandingConfig> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('landing_config')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching landing config:', error);
      return defaultLandingConfig;
    }

    return data.config as LandingConfig;
  },

  async updateConfig(config: LandingConfig): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from('landing_config')
      .update({
        config,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1);

    if (error) throw error;
  },

  async resetConfig(): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from('landing_config')
      .update({
        config: defaultLandingConfig,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1);

    if (error) throw error;
  }
}; 