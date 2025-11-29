import React from 'react';

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
  description: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'planned';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  label: string;
}