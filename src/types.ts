/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Teacher {
  id: string;
  name: string;
  role: string;
  ieltsScore: string;
  avatar: string;
  bio: string;
  experience: string;
  activeGroups: number;
  successfulStudents: number;
  specialties: string[];
  skills: { name: string; value: number }[];
  quote?: string;
  isSupport: boolean;
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  level: string;
  aim: string;
  duration: string;
  frequency: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  author: string;
  fromScore: string;
  toScore: string;
  text: string;
  destination: string;
  year: string;
  avatarInitials: string;
}
