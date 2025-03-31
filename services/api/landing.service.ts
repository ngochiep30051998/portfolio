'use client'

import { createClient } from '@/lib/supabase/client';
import type { LandingConfig } from '@/lib/config/landing';
import { defaultLandingConfig } from '@/lib/config/landing';

export const landingService = {
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
      .upsert({
        id: 1,
        config,
        updated_at: new Date().toISOString(),
      });

    if (error) throw error;
  },

  async resetConfig(): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from('landing_config')
      .upsert({
        id: 1,
        config: defaultLandingConfig,
        updated_at: new Date().toISOString(),
      });

    if (error) throw error;
  }
}; 