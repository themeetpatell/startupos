import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '../contexts/AppStateContext';
import { 
  User, Settings, Edit3, Save, X, Upload, Camera, Mail, Phone, MapPin, 
  Calendar, Globe, Linkedin, Twitter, Github, ExternalLink, Shield, Key, 
  Bell, BellOff, Eye, EyeOff, Lock, Unlock, Trash2, Download, Share2, 
  Copy, Check, AlertCircle, Info, Star, Award, Briefcase, GraduationCap, 
  Target, TrendingUp, Activity, BarChart3, PieChart, Clock, Users, 
  MessageSquare, FileText, Folder, Tag, Hash, AtSign, Plus, Minus, 
  ChevronRight, ChevronDown, MoreHorizontal, Palette, Monitor, Smartphone, 
  Tablet, Moon, Sun, Volume2, VolumeX, Wifi, WifiOff, Database, Server, 
  Cloud, HardDrive, Zap, Brain, Rocket, Building, DollarSign, Lightbulb,
  Heart, MessageCircle, Target as TargetIcon, TrendingUp as TrendingUpIcon,
  Users as UsersIcon, Building as BuildingIcon, DollarSign as DollarSignIcon,
  Calendar as CalendarIcon, MapPin as MapPinIcon, Star as StarIcon,
  Eye as EyeIcon, Plus as PlusIcon, ArrowRight, CheckCircle, AlertCircle as AlertCircleIcon,
  Lock as LockIcon, BarChart3 as BarChart3Icon, FileText as FileTextIcon,
  Briefcase as BriefcaseIcon, Globe as GlobeIcon, Zap as ZapIcon, Search,
  Filter, Bookmark, BookmarkPlus, ThumbsUp, Grid3X3, Grid, List, Play,
  Pause, MoreVertical, Code, Store, MessageCircle as MessageCircleIcon,
  Brain as BrainIcon, Rocket as RocketIcon, Shield as ShieldIcon,
  Lightbulb as LightbulbIcon, Heart as HeartIcon, Target as TargetIcon2,
  TrendingUp as TrendingUpIcon2, Users as UsersIcon2, Building as BuildingIcon2,
  DollarSign as DollarSignIcon2, Calendar as CalendarIcon2, MapPin as MapPinIcon2,
  Star as StarIcon2, Eye as EyeIcon2, Plus as PlusIcon2, ArrowRight as ArrowRightIcon,
  CheckCircle as CheckCircleIcon2, AlertCircle as AlertCircleIcon2,
  Lock as LockIcon2, BarChart3 as BarChart3Icon2, FileText as FileTextIcon2,
  Briefcase as BriefcaseIcon2, Globe as GlobeIcon2, Zap as ZapIcon2,
  Search as SearchIcon, Filter as FilterIcon, Bookmark as BookmarkIcon,
  BookmarkPlus as BookmarkPlusIcon, ThumbsUp as ThumbsUpIcon, Grid3X3 as Grid3X3Icon,
  Grid as GridIcon, List as ListIcon, Play as PlayIcon, Pause as PauseIcon,
  MoreVertical as MoreVerticalIcon, Code as CodeIcon, Store as StoreIcon, Handshake
} from 'lucide-react';

const UserProfile = () => {
  const { state, actions } = useAppState();
  const { userType } = state.user;
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [viewMode, setViewMode] = useState('startupos');
  const [realTimeActivity, setRealTimeActivity] = useState([
    { id: 1, type: 'connection', message: 'Sarah Chen connected with you', time: '2 minutes ago', avatar: '👩‍💼' },
    { id: 2, type: 'achievement', message: 'Earned "AI Tool Creator" achievement', time: '5 minutes ago', avatar: '🤖' },
    { id: 3, type: 'startup', message: 'Mindmate valuation updated to $25M', time: '1 hour ago', avatar: '🚀' },
    { id: 4, type: 'network', message: '3 new connections in your network', time: '2 hours ago', avatar: '🌐' },
    { id: 5, type: 'ai', message: 'AI recommended 5 potential connections', time: '3 hours ago', avatar: '🧠' }
  ]);

  // Comprehensive profile data for different user types
  const getProfileData = (userType) => {
    const baseProfile = {
      // Core Identity
      firstName: 'Meet',
      lastName: 'Patel',
      email: 'meet@biggbizz.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      timezone: 'Pacific Time (PT)',
      avatar: '👩‍💼',
      joinDate: '2023-01-01',
      lastActive: '2 minutes ago',
      userType: userType,
      
      // Verification & Credibility
      verification: {
        email: true,
        phone: true,
        identity: true,
        company: true,
        social: {
          linkedin: true,
          twitter: true,
          github: true
        }
      },
      
      // Comprehensive Social & Professional Links
      social: {
        linkedin: {
          url: 'https://linkedin.com/in/themeetpatel',
          verified: true,
          followers: 15420,
          connections: 5000,
          lastActivity: '2 hours ago'
        },
        twitter: {
          url: 'https://twitter.com/the_meetpatel',
          verified: true,
          followers: 8750,
          following: 1200,
          tweets: 2340,
          lastTweet: '1 day ago'
        },
        github: {
          url: 'https://github.com/themeetpatel',
          verified: true,
          followers: 1200,
          following: 450,
          repos: 89,
          contributions: 2340,
          lastCommit: '3 hours ago'
        },
        medium: {
          url: 'https://medium.com/@themeetpatel',
          verified: false,
          followers: 3200,
          articles: 45,
          lastArticle: '1 week ago'
        },
        youtube: {
          url: 'https://youtube.com/@themeetpatel',
          verified: false,
          subscribers: 1200,
          videos: 23,
          lastVideo: '2 weeks ago'
        },
        instagram: {
          url: 'https://instagram.com/themeetpatel',
          verified: false,
          followers: 4500,
          following: 800,
          posts: 156
        }
      },
      
      // Professional Credentials
      credentials: {
        education: [],
        certifications: [],
        awards: [],
        publications: [],
        patents: []
      },
      
      // Media & News Mentions
      mediaMentions: [],
      
      // Comprehensive Analytics
      analytics: {
        profileViews: {
          total: 12500,
          thisMonth: 450,
          thisWeek: 120,
          today: 15
        },
        engagement: {
          profileViews: 450,
          messageReplies: 89,
          postLikes: 2340,
          commentReplies: 156,
          shares: 78
        },
        influence: {
          reach: 45000,
          engagement: 8.5,
          influenceScore: 92.3,
          authorityScore: 88.7
        }
      }
    };

    switch (userType) {
      case 'founder':
        return {
          ...baseProfile,
          bio: 'Serial entrepreneur building the future of AI-powered mental health. Expert in turning chaos into streamlined growth machines and scaling teams from 0 to 100+ members. Featured in TechCrunch, Forbes, and Y Combinator.',
          title: 'CEO & Co-founder',
          company: 'Mindmate',
          website: 'https://mindmate.ai',
          
          // Enhanced Founder-specific data
          startupStage: 'Series A',
          startupExperience: '8 years',
          industries: ['SaaS', 'AI/ML', 'Enterprise Software', 'Healthcare Tech'],
          startupRoles: ['Founder', 'CEO', 'CTO', 'Product Lead'],
          fundingRaised: '$15.2M',
          exits: 2,
          teamSize: 45,
          totalFunding: '$15.2M',
          totalValuation: '$70M',
          totalExits: '$89M',
          
          // Enhanced Skills & Expertise
          skills: ['Product Management', 'Growth Strategy', 'Team Building', 'Fundraising', 'AI Integration', 'M&A', 'Scaling', 'Leadership'],
          interests: ['Growth and Branding', 'Startup Ecosystem', 'Product Innovation', 'AI Tools', 'M&A', 'Mental Health', 'SaaS'],
          
          // Comprehensive Achievements
          achievements: [
            { title: 'StartupOS Pioneer', description: 'Early adopter and power user', icon: '🚀', category: 'platform', verified: true },
            { title: 'AI Tool Creator', description: 'Built 15+ AI-powered tools', icon: '🤖', category: 'ai', verified: true },
            { title: 'Ecosystem Connector', description: 'Connected 200+ startups', icon: '🌐', category: 'network', verified: true },
            { title: 'M&A Expert', description: 'Completed 3 successful acquisitions', icon: '💼', category: 'm&a', verified: true },
            { title: 'Team Builder', description: 'Built teams of 100+ members', icon: '👥', category: 'leadership', verified: true },
            { title: 'Y Combinator Alumni', description: 'Graduated from YC S19', icon: '🎓', category: 'education', verified: true },
            { title: 'Forbes 30 Under 30', description: 'Featured in 2022 list', icon: '⭐', category: 'recognition', verified: true }
          ],
          
          // Enhanced Stats
          stats: {
            projectsCompleted: 18,
            teamMembers: 45,
            successRate: 96.8,
            aiToolsBuilt: 15,
            startupsConnected: 200,
            dealsFacilitated: 12,
            ecosystemScore: 94.2,
            totalRevenue: '$2.4M',
            monthlyGrowth: 24.5,
            customerSatisfaction: 4.8,
            employeeRetention: 92.3
          },
          
          // Comprehensive Startup Portfolio
          startups: [
            {
              name: 'Mindmate',
              role: 'CEO & Co-founder',
              stage: 'Series A',
              description: 'AI-powered mental health platform serving 50K+ users',
              equity: '45%',
              status: 'active',
              valuation: '$25M',
              teamSize: 45,
              funding: '$8.2M',
              revenue: '$2.4M',
              customers: 50000,
              founded: '2020',
              investors: ['Y Combinator', 'Sequoia Capital', 'Andreessen Horowitz'],
              crunchbaseUrl: 'https://crunchbase.com/organization/mindmate',
              linkedinUrl: 'https://linkedin.com/company/mindmate-ai',
              verified: true
            },
            {
              name: 'TechFlow',
              role: 'CTO',
              stage: 'Acquired',
              description: 'Enterprise automation platform acquired by Microsoft',
              equity: '15%',
              status: 'exited',
              exitValue: '$45M',
              teamSize: 85,
              funding: '$12.5M',
              revenue: '$8.5M',
              customers: 1200,
              founded: '2018',
              acquired: '2022',
              acquirer: 'Microsoft',
              crunchbaseUrl: 'https://crunchbase.com/organization/techflow',
              verified: true
            }
          ],
          
          // AI Tools with enhanced data
          aiTools: [
            {
              name: 'Growth Analytics AI',
              category: 'Analytics',
              downloads: 1250,
              rating: 4.8,
              description: 'AI-powered growth metrics analyzer',
              status: 'published',
              revenue: '$45K',
              users: 1250,
              githubStars: 234,
              lastUpdated: '2024-01-15',
              verified: true
            },
            {
              name: 'Team Performance AI',
              category: 'HR',
              downloads: 890,
              rating: 4.6,
              description: 'AI-driven team productivity insights',
              status: 'published',
              revenue: '$32K',
              users: 890,
              githubStars: 156,
              lastUpdated: '2024-01-10',
              verified: true
            }
          ],
          
          // Enhanced Connections
          connections: {
            founders: 150,
            investors: 45,
            advisors: 23,
            mentors: 12,
            startups: 200,
            corporates: 35,
            total: 465
          },
          
          // Comprehensive Work Experience (LinkedIn-style)
          workHistory: [
            {
              company: 'Mindmate',
              role: 'CEO & Co-founder',
              duration: '2020 - Present',
              location: 'San Francisco, CA',
              employmentType: 'Founder',
              description: 'Founded and scaled AI-powered mental health platform from concept to Series A. Led product strategy, team building, and fundraising efforts.',
              achievements: [
                'Raised $8.2M Series A funding from top-tier VCs including Sequoia Capital and Andreessen Horowitz',
                'Built and scaled team from 2 co-founders to 45 employees across engineering, product, and sales',
                'Grew user base from 0 to 50,000+ active users with 95% customer satisfaction rating',
                'Generated $2.4M ARR through B2B SaaS model serving enterprise clients',
                'Led product development of AI-powered mental health assessment tools used by 100+ companies',
                'Established partnerships with major healthcare providers and insurance companies',
                'Featured in TechCrunch, Forbes, and Y Combinator for innovative approach to mental health tech'
              ],
              technologies: ['Product Strategy', 'Team Leadership', 'Fundraising', 'AI/ML', 'SaaS', 'Healthcare Tech'],
              salary: 'Equity',
              equity: '45%',
              linkedinUrl: 'https://linkedin.com/company/mindmate-ai',
              companySize: '45 employees',
              industry: 'Healthcare Technology',
              verified: true,
              recommendations: [
                {
                  author: 'Sarah Johnson',
                  role: 'VP of Engineering',
                  text: 'Meet is an exceptional leader who combines technical vision with strong business acumen. His ability to build and scale teams is remarkable.',
                  date: '2024-01-10'
                },
                {
                  author: 'David Chen',
                  role: 'Lead Investor, Sequoia Capital',
                  text: 'Meet is one of the most impressive founders I\'ve worked with. His vision and execution capabilities are outstanding.',
                  date: '2023-12-15'
                }
              ]
            },
            {
              company: 'TechFlow',
              role: 'CTO & Co-founder',
              duration: '2018 - 2022',
              location: 'San Francisco, CA',
              employmentType: 'Founder',
              description: 'Co-founded enterprise automation platform that was acquired by Microsoft for $45M. Led technical strategy and engineering team.',
              achievements: [
                'Co-founded company and led technical architecture serving 1,200+ enterprise customers',
                'Built scalable microservices platform processing 10M+ automation workflows daily',
                'Led engineering team of 25 developers across frontend, backend, and infrastructure',
                'Successfully exited to Microsoft for $45M after 4 years of operation',
                'Generated $8.5M ARR through enterprise SaaS model',
                'Patented 3 automation technologies that became core to Microsoft\'s enterprise suite',
                'Mentored 15+ engineers who went on to senior roles at top tech companies'
              ],
              technologies: ['Microservices', 'Kubernetes', 'AWS', 'React', 'Node.js', 'Python', 'PostgreSQL'],
              salary: 'Equity',
              equity: '15%',
              linkedinUrl: 'https://linkedin.com/company/techflow',
              companySize: '85 employees',
              industry: 'Enterprise Software',
              verified: true,
              recommendations: [
                {
                  author: 'Michael Rodriguez',
                  role: 'VP of Product',
                  text: 'Meet\'s technical leadership was instrumental in our success. His ability to scale systems and teams is exceptional.',
                  date: '2022-06-20'
                }
              ]
            },
            {
              company: 'Google',
              role: 'Senior Software Engineer',
              duration: '2016 - 2018',
              location: 'Mountain View, CA',
              employmentType: 'Full-time',
              description: 'Worked on Google Cloud Platform developing AI and machine learning infrastructure. Led technical initiatives for enterprise customers.',
              achievements: [
                'Developed AI-powered features that improved Google Cloud adoption by 40% among enterprise customers',
                'Led technical architecture for machine learning platform serving 1M+ developers',
                'Mentored 5 junior engineers and contributed to Google\'s internal engineering culture',
                'Collaborated with product teams to define technical requirements for 3 major product launches',
                'Contributed to open source projects that became widely adopted in the developer community',
                'Presented technical findings at Google I/O and other major tech conferences'
              ],
              technologies: ['Go', 'Kubernetes', 'Machine Learning', 'Python', 'TensorFlow', 'Google Cloud', 'Docker'],
              salary: '$180K',
              equity: '0.1%',
              linkedinUrl: 'https://linkedin.com/company/google',
              companySize: '10000+ employees',
              industry: 'Technology',
              verified: true,
              recommendations: [
                {
                  author: 'Alex Chen',
                  role: 'Staff Software Engineer',
                  text: 'Meet is an exceptional engineer with strong technical skills and leadership potential. Great collaborator and mentor.',
                  date: '2018-05-15'
                }
              ]
            },
            {
              company: 'Y Combinator',
              role: 'Startup Founder (Batch S19)',
              duration: 'Summer 2019',
              location: 'Mountain View, CA',
              employmentType: 'Accelerator',
              description: 'Participated in Y Combinator accelerator program for Mindmate. Received mentorship and funding to scale the startup.',
              achievements: [
                'Selected for prestigious Y Combinator S19 batch from 10,000+ applications',
                'Received $150K seed funding and access to YC network of mentors and investors',
                'Participated in weekly dinners with successful entrepreneurs and industry leaders',
                'Pitched to 200+ investors during Demo Day and raised additional $500K',
                'Connected with 50+ other founders and built lasting professional relationships',
                'Received mentorship from YC partners on product, growth, and fundraising strategies'
              ],
              technologies: ['Startup Strategy', 'Fundraising', 'Product Development', 'Growth Hacking'],
              salary: '$150K investment',
              linkedinUrl: 'https://linkedin.com/company/ycombinator',
              companySize: '200+ employees',
              industry: 'Venture Capital',
              verified: true
            }
          ],

          // Professional Credentials
          credentials: {
            education: [
              {
                institution: 'Stanford University',
                degree: 'MS Computer Science',
                year: '2016',
                gpa: '3.8',
                specialization: 'Artificial Intelligence & Machine Learning',
                thesis: 'Deep Learning Applications in Healthcare Technology',
                verified: true
              },
              {
                institution: 'UC Berkeley',
                degree: 'BS Computer Science',
                year: '2014',
                gpa: '3.9',
                specialization: 'Software Engineering',
                honors: 'Magna Cum Laude',
                verified: true
              }
            ],
            certifications: [
              {
                name: 'AWS Solutions Architect',
                issuer: 'Amazon Web Services',
                year: '2020',
                verified: true
              },
              {
                name: 'Google Cloud Professional',
                issuer: 'Google',
                year: '2021',
                verified: true
              }
            ],
            awards: [
              {
                title: 'Forbes 30 Under 30',
                year: '2022',
                category: 'Technology',
                verified: true
              },
              {
                title: 'Y Combinator Top 10',
                year: '2019',
                category: 'Startup',
                verified: true
              }
            ],
            publications: [
              {
                title: 'Building AI-First Startups',
                publisher: 'Harvard Business Review',
                year: '2023',
                url: 'https://hbr.org/2023/ai-first-startups',
                verified: true
              }
            ],
            patents: [
              {
                title: 'AI-Powered Mental Health Assessment System',
                number: 'US11234567B2',
                year: '2022',
                status: 'Granted',
                verified: true
              }
            ]
          },
          
          // Media Mentions
          mediaMentions: [
            {
              title: 'Meet Patel\'s Mindmate Raises $8.2M Series A',
              source: 'TechCrunch',
              date: '2024-01-15',
              url: 'https://techcrunch.com/mindmate-series-a',
              type: 'funding',
              verified: true
            },
            {
              title: 'How This Founder Built a $25M Mental Health Platform',
              source: 'Forbes',
              date: '2023-12-20',
              url: 'https://forbes.com/mindmate-founder',
              type: 'profile',
              verified: true
            },
            {
              title: 'Y Combinator Alumni Making Waves in AI',
              source: 'Y Combinator Blog',
              date: '2023-11-10',
              url: 'https://blog.ycombinator.com/ai-alumni',
              type: 'recognition',
              verified: true
            }
          ]
        };

      case 'employee':
        return {
          ...baseProfile,
          bio: 'Senior software engineer passionate about building scalable products and leading technical teams. Expert in full-stack development and AI integration. Open source contributor and technical mentor.',
          title: 'Senior Software Engineer',
          company: 'DataTech Corp',
          website: 'https://datatech.com',
          
          // Enhanced Employee-specific data
          currentRole: 'Senior Software Engineer',
          experience: '5 years',
          department: 'Engineering',
          level: 'Senior',
          salary: '$180K',
          equity: '0.5%',
          startDate: '2022-03-01',
          
          // Enhanced Skills & Expertise
          skills: ['React', 'Node.js', 'Python', 'AWS', 'Machine Learning', 'Team Leadership', 'TypeScript', 'Docker', 'Kubernetes', 'GraphQL'],
          interests: ['Technical Leadership', 'AI/ML', 'Open Source', 'Mentoring', 'Product Development', 'System Architecture'],
          
          // Comprehensive Achievements
          achievements: [
            { title: 'Code Excellence', description: 'Consistently high code quality scores', icon: '💻', category: 'technical', verified: true },
            { title: 'Team Player', description: 'Mentored 10+ junior developers', icon: '👥', category: 'leadership', verified: true },
            { title: 'Innovation Leader', description: 'Led 5 major product features', icon: '🚀', category: 'product', verified: true },
            { title: 'Open Source Contributor', description: '500+ GitHub contributions', icon: '📦', category: 'community', verified: true },
            { title: 'Performance Champion', description: 'Improved system performance by 40%', icon: '⚡', category: 'technical', verified: true },
            { title: 'Mentor of the Year', description: 'Recognized for outstanding mentorship', icon: '🎯', category: 'leadership', verified: true }
          ],
          
          // Enhanced Stats
          stats: {
            projectsCompleted: 25,
            codeReviews: 150,
            mentees: 10,
            certifications: 8,
            performanceScore: 4.8,
            yearsExperience: 5,
            linesOfCode: 50000,
            bugsFixed: 234,
            featuresShipped: 18,
            teamSize: 8
          },
          
          // Comprehensive Work History (LinkedIn-style)
          workHistory: [
            {
              company: 'DataTech Corp',
              role: 'Senior Software Engineer',
              duration: '2022 - Present',
              location: 'San Francisco, CA',
              employmentType: 'Full-time',
              description: 'Leading development of AI-powered analytics platform serving 100K+ users. Responsible for architecting scalable solutions and mentoring junior developers.',
              achievements: [
                'Led team of 5 developers in building microservices architecture that improved system performance by 40%',
                'Reduced infrastructure costs by 30% through optimization and cloud migration strategies',
                'Implemented CI/CD pipeline that reduced deployment time from 2 hours to 15 minutes',
                'Mentored 3 junior developers, with 2 receiving promotions within 6 months',
                'Designed and implemented real-time data processing system handling 1M+ events per day',
                'Collaborated with product team to define technical requirements for 3 major feature releases'
              ],
              technologies: ['React', 'Node.js', 'Python', 'AWS', 'PostgreSQL', 'Docker', 'Kubernetes', 'GraphQL'],
              salary: '$180K',
              equity: '0.5%',
              linkedinUrl: 'https://linkedin.com/company/datatech-corp',
              companySize: '201-500 employees',
              industry: 'Software Development',
              verified: true,
              recommendations: [
                {
                  author: 'Sarah Chen',
                  role: 'Engineering Manager',
                  text: 'Meet is an exceptional engineer who consistently delivers high-quality code and mentors others effectively.',
                  date: '2023-12-15'
                },
                {
                  author: 'Michael Rodriguez',
                  role: 'Product Manager',
                  text: 'Working with Meet was a pleasure. His technical expertise and communication skills made complex projects seamless.',
                  date: '2023-11-20'
                }
              ]
            },
            {
              company: 'TechStart Inc',
              role: 'Software Engineer',
              duration: '2020 - 2022',
              location: 'San Francisco, CA',
              employmentType: 'Full-time',
              description: 'Full-stack development for e-commerce platform processing $10M+ annually. Built scalable microservices and improved system performance.',
              achievements: [
                'Built scalable microservices architecture that reduced system downtime by 95%',
                'Reduced page load time by 60% through performance optimization and caching strategies',
                'Implemented comprehensive CI/CD pipeline with automated testing and deployment',
                'Developed RESTful APIs that served 50K+ daily active users',
                'Collaborated with UX team to improve user experience, resulting in 25% increase in conversion rate',
                'Led migration from monolithic to microservices architecture over 8-month period'
              ],
              technologies: ['Vue.js', 'Express.js', 'MongoDB', 'Docker', 'Redis', 'AWS', 'Jest', 'Webpack'],
              salary: '$120K',
              equity: '0.2%',
              linkedinUrl: 'https://linkedin.com/company/techstart-inc',
              companySize: '51-200 employees',
              industry: 'E-commerce',
              verified: true,
              recommendations: [
                {
                  author: 'David Kim',
                  role: 'Senior Software Engineer',
                  text: 'Meet is a talented developer with strong problem-solving skills and great team collaboration abilities.',
                  date: '2022-08-10'
                }
              ]
            },
            {
              company: 'CodeAcademy',
              role: 'Junior Developer',
              duration: '2019 - 2020',
              location: 'New York, NY',
              employmentType: 'Full-time',
              description: 'Frontend development for educational platform serving 50M+ learners worldwide. Built responsive UI components and improved user engagement.',
              achievements: [
                'Built responsive UI components using React that improved mobile user experience by 40%',
                'Improved user engagement by 25% through A/B testing and iterative design improvements',
                'Developed reusable component library used across 5 different product teams',
                'Collaborated with design team to implement new course interface, increasing completion rates by 15%',
                'Optimized bundle size by 30% through code splitting and lazy loading implementation',
                'Participated in code reviews and contributed to team coding standards documentation'
              ],
              technologies: ['React', 'Redux', 'CSS3', 'JavaScript', 'Sass', 'Jest', 'Enzyme', 'Webpack'],
              salary: '$85K',
              linkedinUrl: 'https://linkedin.com/company/codecademy',
              companySize: '201-500 employees',
              industry: 'Education Technology',
              verified: true,
              recommendations: [
                {
                  author: 'Jennifer Liu',
                  role: 'Frontend Team Lead',
                  text: 'Meet showed great potential and growth during their time at CodeAcademy. Always eager to learn and contribute.',
                  date: '2020-06-15'
                }
              ]
            },
            {
              company: 'Freelance Web Development',
              role: 'Web Developer',
              duration: '2018 - 2019',
              location: 'Remote',
              employmentType: 'Self-employed',
              description: 'Provided web development services to small businesses and startups. Built custom websites and web applications.',
              achievements: [
                'Developed 15+ custom websites for small businesses, improving their online presence',
                'Built e-commerce platform for local retailer, increasing online sales by 200%',
                'Created responsive web applications using modern JavaScript frameworks',
                'Managed client relationships and project delivery timelines',
                'Learned and implemented various payment gateways and third-party integrations'
              ],
              technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'PHP', 'MySQL', 'WordPress', 'Bootstrap'],
              salary: '$60K',
              verified: true
            }
          ],
          
          // Enhanced Connections
          connections: {
            colleagues: 45,
            mentors: 8,
            mentees: 10,
            industry: 120,
            alumni: 25,
            total: 208
          },
          
          // Professional Credentials
          credentials: {
            education: [
              {
                institution: 'Carnegie Mellon University',
                degree: 'MS Software Engineering',
                year: '2019',
                gpa: '3.7',
                verified: true
              },
              {
                institution: 'University of California',
                degree: 'BS Computer Science',
                year: '2017',
                gpa: '3.6',
                verified: true
              }
            ],
            certifications: [
              {
                name: 'AWS Solutions Architect',
                issuer: 'Amazon Web Services',
                year: '2021',
                verified: true
              },
              {
                name: 'Google Cloud Professional',
                issuer: 'Google',
                year: '2022',
                verified: true
              },
              {
                name: 'Kubernetes Administrator',
                issuer: 'CNCF',
                year: '2023',
                verified: true
              }
            ],
            awards: [
              {
                title: 'Employee of the Year',
                year: '2023',
                category: 'Performance',
                company: 'DataTech Corp',
                verified: true
              },
              {
                title: 'Best Mentor Award',
                year: '2022',
                category: 'Leadership',
                company: 'DataTech Corp',
                verified: true
              }
            ],
            publications: [
              {
                title: 'Building Scalable Microservices with Node.js',
                publisher: 'Medium',
                year: '2023',
                url: 'https://medium.com/@themeetpatel/microservices-nodejs',
                verified: true
              }
            ]
          },
          
          // Open Source Contributions
          openSource: [
            {
              name: 'react-performance-optimizer',
              description: 'React performance optimization library',
              stars: 234,
              forks: 45,
              contributions: 89,
              lastCommit: '2024-01-10',
              verified: true
            },
            {
              name: 'aws-cost-optimizer',
              description: 'AWS cost optimization tool',
              stars: 156,
              forks: 23,
              contributions: 67,
              lastCommit: '2024-01-05',
              verified: true
            }
          ],
          
          // Media Mentions
          mediaMentions: [
            {
              title: 'Top 10 Open Source Contributors of 2023',
              source: 'GitHub Blog',
              date: '2023-12-15',
              url: 'https://github.blog/top-contributors-2023',
              type: 'recognition',
              verified: true
            }
          ]
        };

      case 'investor':
        return {
          ...baseProfile,
          bio: 'Venture capitalist focused on early-stage B2B SaaS and AI companies. Passionate about supporting founders and building the next generation of unicorns. Featured in Forbes Midas List and TechCrunch.',
          title: 'Managing Partner',
          company: 'Venture Capital Partners',
          website: 'https://vcpartners.com',
          
          // Enhanced Investor-specific data
          firm: 'Venture Capital Partners',
          role: 'Managing Partner',
          focus: 'Early-stage B2B SaaS & AI',
          experience: '12 years',
          fundSize: '$500M',
          checkSize: '$500K - $5M',
          boardSeats: 8,
          
          // Enhanced Skills & Expertise
          skills: ['Due Diligence', 'Portfolio Management', 'Fundraising', 'M&A', 'Market Analysis', 'Board Governance', 'Strategic Planning'],
          interests: ['B2B SaaS', 'AI/ML', 'Fintech', 'Healthcare Tech', 'Market Trends', 'Deep Tech', 'Enterprise Software'],
          
          // Comprehensive Achievements
          achievements: [
            { title: 'Deal Maker', description: 'Led 25+ successful investments', icon: '💼', category: 'investment', verified: true },
            { title: 'Unicorn Hunter', description: 'Invested in 3 unicorn companies', icon: '🦄', category: 'success', verified: true },
            { title: 'Portfolio Builder', description: 'Built $500M+ portfolio', icon: '📈', category: 'growth', verified: true },
            { title: 'Mentor', description: 'Mentored 50+ founders', icon: '🎯', category: 'leadership', verified: true },
            { title: 'Forbes Midas List', description: 'Top 100 VCs globally', icon: '⭐', category: 'recognition', verified: true },
            { title: 'Board Member', description: '8 active board seats', icon: '🏢', category: 'governance', verified: true }
          ],
          
          // Enhanced Stats
          stats: {
            portfolioCompanies: 45,
            totalInvestments: '$125M',
            successfulExits: 8,
            averageReturn: '3.2x',
            activeDeals: 12,
            yearsInvesting: 12,
            totalFunds: 3,
            fundSize: '$500M',
            irr: '28.5%',
            tvpi: '2.8x'
          },
          
          // Comprehensive Portfolio
          portfolio: [
            {
              name: 'AI Analytics Co',
              stage: 'Series A',
              investment: '$2M',
              status: 'Active',
              valuation: '$50M',
              sector: 'AI/ML',
              return: '2.5x',
              founded: '2020',
              employees: 45,
              revenue: '$5M',
              investors: ['VCP', 'Sequoia', 'Andreessen Horowitz'],
              crunchbaseUrl: 'https://crunchbase.com/organization/ai-analytics',
              linkedinUrl: 'https://linkedin.com/company/ai-analytics-co',
              verified: true
            },
            {
              name: 'CloudTech Solutions',
              stage: 'Acquired',
              investment: '$1.5M',
              status: 'Exited',
              exitValue: '$45M',
              sector: 'SaaS',
              return: '4.2x',
              founded: '2018',
              acquired: '2022',
              acquirer: 'Salesforce',
              crunchbaseUrl: 'https://crunchbase.com/organization/cloudtech',
              verified: true
            },
            {
              name: 'DataFlow Inc',
              stage: 'Series B',
              investment: '$3M',
              status: 'Active',
              valuation: '$120M',
              sector: 'Data Analytics',
              return: '3.8x',
              founded: '2019',
              employees: 78,
              revenue: '$12M',
              investors: ['VCP', 'Index Ventures', 'Bessemer'],
              crunchbaseUrl: 'https://crunchbase.com/organization/dataflow',
              verified: true
            }
          ],
          
          // Enhanced Connections
          connections: {
            founders: 200,
            coInvestors: 150,
            advisors: 75,
            portfolio: 45,
            industry: 300,
            lps: 25,
            total: 795
          },
          
          // Comprehensive Work Experience (LinkedIn-style)
          workHistory: [
            {
              company: 'Venture Capital Partners',
              role: 'Managing Partner',
              duration: '2020 - Present',
              location: 'San Francisco, CA',
              employmentType: 'Full-time',
              description: 'Leading early-stage B2B SaaS and AI investments. Managing $500M fund and portfolio of 45+ companies. Focus on Series A and B rounds.',
              achievements: [
                'Led 25+ successful investments totaling $125M across B2B SaaS and AI sectors',
                'Achieved 3.2x average return with 8 successful exits including 3 unicorn companies',
                'Built and managed portfolio of 45+ companies with combined valuation of $2B+',
                'Mentored 50+ founders and provided strategic guidance on growth and scaling',
                'Established VCP as top-tier VC firm in B2B SaaS space with 28.5% IRR',
                'Led due diligence processes and investment committee decisions for $500M fund',
                'Featured in Forbes Midas List 2023 as top 100 VCs globally'
              ],
              technologies: ['Due Diligence', 'Portfolio Management', 'Fundraising', 'M&A', 'Market Analysis', 'Board Governance'],
              salary: '$400K + Carry',
              linkedinUrl: 'https://linkedin.com/company/vcpartners',
              companySize: '50-100 employees',
              industry: 'Venture Capital',
              verified: true,
              recommendations: [
                {
                  author: 'Sarah Williams',
                  role: 'Portfolio Company CEO',
                  text: 'Meet\'s strategic guidance and network connections were instrumental in our company\'s success. Exceptional investor and mentor.',
                  date: '2024-01-05'
                },
                {
                  author: 'Michael Chen',
                  role: 'Co-Managing Partner',
                  text: 'Meet is one of the most talented investors I\'ve worked with. His ability to identify and support great companies is outstanding.',
                  date: '2023-12-20'
                }
              ]
            },
            {
              company: 'Andreessen Horowitz',
              role: 'Principal',
              duration: '2016 - 2020',
              location: 'Menlo Park, CA',
              employmentType: 'Full-time',
              description: 'Focused on enterprise software and AI investments. Led due diligence and portfolio management for early-stage companies.',
              achievements: [
                'Led investments in 15+ companies totaling $50M across enterprise software and AI sectors',
                'Achieved 2.8x average return with 5 successful exits including 2 unicorn companies',
                'Built expertise in AI/ML investments and became go-to person for technical due diligence',
                'Mentored 25+ founders and provided strategic guidance on product and growth',
                'Collaborated with a16z portfolio companies on strategic initiatives and partnerships',
                'Contributed to a16z\'s thought leadership in AI and enterprise software space'
              ],
              technologies: ['Investment Analysis', 'Due Diligence', 'Portfolio Management', 'AI/ML', 'Enterprise Software'],
              salary: '$300K + Carry',
              linkedinUrl: 'https://linkedin.com/company/andreessen-horowitz',
              companySize: '200+ employees',
              industry: 'Venture Capital',
              verified: true,
              recommendations: [
                {
                  author: 'David Kim',
                  role: 'General Partner',
                  text: 'Meet\'s technical background and investment acumen made him a valuable member of our team. Great at identifying promising companies.',
                  date: '2020-03-15'
                }
              ]
            },
            {
              company: 'Goldman Sachs',
              role: 'Investment Banking Associate',
              duration: '2012 - 2016',
              location: 'New York, NY',
              employmentType: 'Full-time',
              description: 'Worked in Technology Investment Banking group. Led M&A transactions and IPOs for technology companies.',
              achievements: [
                'Led 20+ M&A transactions totaling $5B+ in deal value across technology sector',
                'Worked on 5 major IPOs including 2 unicorn companies going public',
                'Built financial models and conducted valuation analysis for technology companies',
                'Managed client relationships with C-level executives at Fortune 500 companies',
                'Mentored 3 junior analysts and contributed to team culture and development',
                'Developed expertise in SaaS business models and technology sector trends'
              ],
              technologies: ['Financial Modeling', 'M&A', 'IPO', 'Valuation', 'Excel', 'PowerPoint', 'Bloomberg Terminal'],
              salary: '$150K + Bonus',
              linkedinUrl: 'https://linkedin.com/company/goldman-sachs',
              companySize: '10000+ employees',
              industry: 'Investment Banking',
              verified: true,
              recommendations: [
                {
                  author: 'Jennifer Liu',
                  role: 'Vice President',
                  text: 'Meet was an outstanding analyst with strong technical skills and client relationship abilities. Great potential in finance.',
                  date: '2016-06-10'
                }
              ]
            },
            {
              company: 'McKinsey & Company',
              role: 'Business Analyst',
              duration: '2010 - 2012',
              location: 'New York, NY',
              employmentType: 'Full-time',
              description: 'Worked on strategy consulting projects for Fortune 500 companies. Focused on technology and digital transformation initiatives.',
              achievements: [
                'Led 8+ consulting projects for Fortune 500 companies across technology and healthcare sectors',
                'Developed strategic recommendations that resulted in $100M+ in client value creation',
                'Built expertise in digital transformation and technology strategy consulting',
                'Mentored 2 junior analysts and contributed to McKinsey\'s knowledge development',
                'Collaborated with senior partners on business development and client relationships',
                'Contributed to McKinsey\'s thought leadership on technology trends and digital strategy'
              ],
              technologies: ['Strategy Consulting', 'Digital Transformation', 'Data Analysis', 'PowerPoint', 'Excel', 'SQL'],
              salary: '$80K + Bonus',
              linkedinUrl: 'https://linkedin.com/company/mckinsey-and-company',
              companySize: '10000+ employees',
              industry: 'Management Consulting',
              verified: true,
              recommendations: [
                {
                  author: 'Robert Johnson',
                  role: 'Senior Partner',
                  text: 'Meet was a top performer with exceptional analytical skills and client relationship abilities. Great potential in consulting.',
                  date: '2012-05-20'
                }
              ]
            }
          ],

          // Professional Credentials
          credentials: {
            education: [
              {
                institution: 'Harvard Business School',
                degree: 'MBA',
                year: '2012',
                gpa: '3.8',
                specialization: 'Finance & Strategy',
                honors: 'Baker Scholar (Top 5%)',
                verified: true
              },
              {
                institution: 'Stanford University',
                degree: 'BS Computer Science',
                year: '2008',
                gpa: '3.9',
                specialization: 'Artificial Intelligence',
                honors: 'Phi Beta Kappa',
                verified: true
              }
            ],
            certifications: [
              {
                name: 'Chartered Financial Analyst',
                issuer: 'CFA Institute',
                year: '2015',
                verified: true
              },
              {
                name: 'Certified Public Accountant',
                issuer: 'AICPA',
                year: '2013',
                verified: true
              }
            ],
            awards: [
              {
                title: 'Forbes Midas List',
                year: '2023',
                category: 'Venture Capital',
                verified: true
              },
              {
                title: 'Top 40 Under 40',
                year: '2022',
                category: 'Finance',
                source: 'Fortune',
                verified: true
              }
            ],
            publications: [
              {
                title: 'The Future of AI Investing',
                publisher: 'Harvard Business Review',
                year: '2023',
                url: 'https://hbr.org/2023/ai-investing-future',
                verified: true
              }
            ]
          },
          
          // Board Positions
          boardPositions: [
            {
              company: 'AI Analytics Co',
              role: 'Board Member',
              since: '2021',
              status: 'Active',
              verified: true
            },
            {
              company: 'DataFlow Inc',
              role: 'Board Observer',
              since: '2020',
              status: 'Active',
              verified: true
            }
          ],
          
          // Media Mentions
          mediaMentions: [
            {
              title: 'Meet Patel Named to Forbes Midas List 2023',
              source: 'Forbes',
              date: '2023-04-15',
              url: 'https://forbes.com/midas-list-2023',
              type: 'recognition',
              verified: true
            },
            {
              title: 'VCP\'s Meet Patel on AI Investment Trends',
              source: 'TechCrunch',
              date: '2023-03-20',
              url: 'https://techcrunch.com/ai-investment-trends-2023',
              type: 'expertise',
              verified: true
            }
          ]
        };

      case 'unemployed':
        return {
          ...baseProfile,
          bio: 'Passionate developer seeking opportunities in AI and full-stack development. Recent graduate with strong technical skills and eagerness to contribute to innovative projects. Active in open source and tech communities.',
          title: 'Software Developer',
          company: 'Seeking Opportunities',
          website: 'https://github.com/themeetpatel',
          
          // Enhanced Job seeker-specific data
          status: 'Actively Seeking',
          experience: '2 years',
          availability: 'Immediate',
          expectedSalary: '$80K - $120K',
          preferredLocation: 'San Francisco, CA',
          workType: 'Remote/Hybrid',
          
          // Enhanced Skills & Expertise
          skills: ['JavaScript', 'React', 'Python', 'SQL', 'Git', 'Agile', 'TypeScript', 'Node.js', 'AWS', 'Docker'],
          interests: ['Web Development', 'AI/ML', 'Startups', 'Open Source', 'Learning', 'Mobile Development', 'DevOps'],
          
          // Comprehensive Achievements
          achievements: [
            { title: 'Code Bootcamp Graduate', description: 'Completed intensive 6-month program', icon: '🎓', category: 'education', verified: true },
            { title: 'Project Builder', description: 'Built 15+ personal projects', icon: '🛠️', category: 'projects', verified: true },
            { title: 'Open Source Contributor', description: 'Active contributor to 5+ repos', icon: '📦', category: 'community', verified: true },
            { title: 'Certification Earned', description: 'AWS Cloud Practitioner certified', icon: '🏆', category: 'certification', verified: true },
            { title: 'Hackathon Winner', description: 'Won 3 hackathons', icon: '🏅', category: 'competition', verified: true },
            { title: 'Tech Speaker', description: 'Spoke at 5 tech meetups', icon: '🎤', category: 'community', verified: true }
          ],
          
          // Enhanced Stats
          stats: {
            applicationsSent: 45,
            interviews: 8,
            projectsBuilt: 15,
            skillsLearned: 12,
            networkingEvents: 20,
            monthsSearching: 3,
            githubCommits: 1200,
            hackathonsWon: 3,
            meetupsAttended: 25,
            onlineCourses: 8
          },
          
          // Comprehensive Work Experience (LinkedIn-style)
          workHistory: [
            {
              company: 'Google (Internship)',
              role: 'Software Engineering Intern',
              duration: 'Summer 2023',
              location: 'Mountain View, CA',
              employmentType: 'Internship',
              description: 'Worked on Google Cloud Platform team developing AI-powered features for enterprise customers. Collaborated with senior engineers on production systems.',
              achievements: [
                'Developed AI-powered feature that improved user engagement by 35% across 10K+ enterprise customers',
                'Built scalable microservice using Go and Kubernetes that processed 100K+ requests daily',
                'Collaborated with product team to define technical requirements and user stories',
                'Participated in code reviews and contributed to team coding standards',
                'Presented technical findings to 50+ engineers in weekly tech talks',
                'Mentored by senior staff engineer who provided guidance on system design and best practices'
              ],
              technologies: ['Go', 'Kubernetes', 'Google Cloud', 'Machine Learning', 'Python', 'Docker', 'gRPC'],
              salary: '$8K/month',
              linkedinUrl: 'https://linkedin.com/company/google',
              companySize: '10000+ employees',
              industry: 'Technology',
              verified: true,
              recommendations: [
                {
                  author: 'Alex Chen',
                  role: 'Staff Software Engineer',
                  text: 'Meet was an outstanding intern who showed exceptional technical skills and strong work ethic. Would definitely hire full-time.',
                  date: '2023-08-30'
                }
              ]
            },
            {
              company: 'StartupXYZ (Internship)',
              role: 'Frontend Development Intern',
              duration: 'Summer 2022',
              location: 'San Francisco, CA',
              employmentType: 'Internship',
              description: 'Worked on frontend development for early-stage startup building B2B SaaS platform. Gained experience in React, TypeScript, and modern web development.',
              achievements: [
                'Built responsive dashboard components that improved user experience for 500+ beta users',
                'Implemented real-time data visualization using D3.js and WebSocket connections',
                'Collaborated with design team to create consistent UI/UX across the platform',
                'Optimized bundle size by 40% through code splitting and lazy loading',
                'Participated in daily standups and agile development process',
                'Contributed to open source component library used across multiple projects'
              ],
              technologies: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'Sass', 'Jest', 'Webpack'],
              salary: '$4K/month',
              linkedinUrl: 'https://linkedin.com/company/startupxyz',
              companySize: '11-50 employees',
              industry: 'SaaS',
              verified: true,
              recommendations: [
                {
                  author: 'Maria Rodriguez',
                  role: 'Frontend Lead',
                  text: 'Meet brought fresh ideas and excellent technical skills to our team. Great to work with and always eager to learn.',
                  date: '2022-08-15'
                }
              ]
            },
            {
              company: 'Freelance Web Development',
              role: 'Web Developer',
              duration: '2021 - 2023',
              location: 'Remote',
              employmentType: 'Self-employed',
              description: 'Provided web development services to small businesses and startups. Built custom websites, web applications, and e-commerce platforms.',
              achievements: [
                'Developed 20+ custom websites for small businesses, improving their online presence and sales',
                'Built e-commerce platform for local retailer that increased online sales by 300%',
                'Created responsive web applications using modern JavaScript frameworks and libraries',
                'Managed client relationships, project timelines, and budget constraints',
                'Learned and implemented various payment gateways, analytics, and third-party integrations',
                'Maintained and updated existing websites, ensuring security and performance optimization'
              ],
              technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Stripe', 'AWS', 'Tailwind CSS', 'Figma'],
              salary: '$50K/year',
              verified: true
            }
          ],

          // Comprehensive Projects
          projects: [
            {
              name: 'AI Chatbot Platform',
              description: 'Full-stack web application with AI integration serving 1K+ users. Features natural language processing, user authentication, and real-time chat.',
              tech: ['React', 'Node.js', 'OpenAI API', 'MongoDB', 'Socket.io', 'JWT'],
              status: 'Completed',
              github: 'https://github.com/themeetpatel/ai-chatbot',
              demo: 'https://ai-chatbot-demo.vercel.app',
              stars: 45,
              forks: 12,
              verified: true,
              achievements: [
                'Implemented real-time chat functionality with WebSocket connections',
                'Integrated OpenAI API for natural language processing and response generation',
                'Built user authentication system with JWT tokens and password encryption',
                'Created responsive UI with modern design principles and accessibility features',
                'Deployed on Vercel with CI/CD pipeline for automatic deployments'
              ]
            },
            {
              name: 'E-commerce Platform',
              description: 'Complete online store with payment integration, inventory management, and admin dashboard. Built for local business with 500+ products.',
              tech: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind CSS', 'Redux', 'JWT'],
              status: 'Completed',
              github: 'https://github.com/themeetpatel/ecommerce',
              demo: 'https://ecommerce-demo.vercel.app',
              stars: 23,
              forks: 8,
              verified: true,
              achievements: [
                'Integrated Stripe payment processing with secure checkout flow',
                'Built admin dashboard for inventory management and order tracking',
                'Implemented search and filtering functionality for product catalog',
                'Created responsive design that works across all devices',
                'Added user reviews and rating system with moderation features'
              ]
            },
            {
              name: 'Task Management App',
              description: 'Collaborative task management application with real-time updates, team collaboration, and project tracking features.',
              tech: ['Vue.js', 'Socket.io', 'Express.js', 'PostgreSQL', 'Redis', 'Docker'],
              status: 'Completed',
              github: 'https://github.com/themeetpatel/task-manager',
              demo: 'https://task-manager-demo.vercel.app',
              stars: 67,
              forks: 15,
              verified: true,
              achievements: [
                'Implemented real-time collaboration with WebSocket connections',
                'Built drag-and-drop interface for task management and project organization',
                'Created team management system with role-based permissions',
                'Added notification system for task updates and deadlines',
                'Integrated with calendar applications for deadline tracking'
              ]
            },
            {
              name: 'Weather Dashboard',
              description: 'Real-time weather dashboard with location-based forecasts, interactive maps, and weather alerts.',
              tech: ['React', 'OpenWeather API', 'Mapbox', 'Chart.js', 'PWA'],
              status: 'Completed',
              github: 'https://github.com/themeetpatel/weather-dashboard',
              demo: 'https://weather-dashboard-demo.vercel.app',
              stars: 34,
              forks: 9,
              verified: true,
              achievements: [
                'Integrated multiple weather APIs for accurate and comprehensive data',
                'Built interactive maps with weather overlays and location markers',
                'Created responsive PWA that works offline with cached data',
                'Implemented weather alerts and notification system',
                'Added data visualization with interactive charts and graphs'
              ]
            }
          ],
          
          // Enhanced Connections
          connections: {
            recruiters: 25,
            mentors: 5,
            peers: 50,
            industry: 100,
            alumni: 30,
            total: 210
          },
          
          // Professional Credentials
          credentials: {
            education: [
              {
                institution: 'CodeAcademy Bootcamp',
                degree: 'Full-Stack Development',
                year: '2023',
                gpa: '4.0',
                verified: true
              },
              {
                institution: 'University of California',
                degree: 'BS Computer Science',
                year: '2022',
                gpa: '3.6',
                verified: true
              }
            ],
            certifications: [
              {
                name: 'AWS Cloud Practitioner',
                issuer: 'Amazon Web Services',
                year: '2023',
                verified: true
              },
              {
                name: 'React Developer Certification',
                issuer: 'Meta',
                year: '2023',
                verified: true
              },
              {
                name: 'Python Programming',
                issuer: 'Google',
                year: '2022',
                verified: true
              }
            ],
            awards: [
              {
                title: 'Hackathon Winner',
                year: '2023',
                category: 'Innovation',
                event: 'TechCrunch Disrupt',
                verified: true
              }
            ]
          },
          
          // Job Applications
          jobApplications: [
            {
              company: 'Google',
              position: 'Software Engineer',
              status: 'Interview',
              appliedDate: '2024-01-10',
              salary: '$120K',
              verified: true
            },
            {
              company: 'Meta',
              position: 'Frontend Developer',
              status: 'Applied',
              appliedDate: '2024-01-08',
              salary: '$110K',
              verified: true
            },
            {
              company: 'StartupXYZ',
              position: 'Full-Stack Developer',
              status: 'Rejected',
              appliedDate: '2024-01-05',
              salary: '$90K',
              verified: true
            }
          ],
          
          // Media Mentions
          mediaMentions: [
            {
              title: 'Rising Star Developer Profile',
              source: 'Dev.to',
              date: '2023-12-01',
              url: 'https://dev.to/rising-star-developer',
              type: 'profile',
              verified: true
            }
          ]
        };

      default:
        return baseProfile;
    }
  };

  const [userProfile, setUserProfile] = useState(getProfileData(userType));

  // Update profile when userType changes
  useEffect(() => {
    setUserProfile(getProfileData(userType));
  }, [userType]);

  // Define tabs based on user type
  const getTabsForUserType = (userType, profile) => {
    const baseTabs = [
      { id: 'overview', label: 'Profile Overview', icon: User, color: 'blue', count: null },
      { id: 'credentials', label: 'Credentials', icon: GraduationCap, color: 'blue', count: (profile.credentials?.education?.length || 0) + (profile.credentials?.certifications?.length || 0) + (profile.credentials?.awards?.length || 0) },
      { id: 'achievements', label: 'Achievements', icon: Award, color: 'blue', count: profile.achievements?.length || 0 },
      { id: 'media', label: 'Media Mentions', icon: Globe, color: 'blue', count: profile.mediaMentions?.length || 0 },
      { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'blue', count: null },
      { id: 'settings', label: 'Settings', icon: Settings, color: 'gray', count: null }
    ];

    switch (userType) {
      case 'founder':
        return [
          ...baseTabs.slice(0, 1),
          { id: 'career', label: 'Career History', icon: Briefcase, color: 'blue', count: profile.workHistory?.length || 0 },
          { id: 'startup', label: 'Startup Portfolio', icon: Building, color: 'blue', count: profile.startups?.length || 0 },
          { id: 'ai-tools', label: 'AI Tools Created', icon: Brain, color: 'blue', count: profile.stats?.aiToolsBuilt || 0 },
          ...baseTabs.slice(1)
        ];
      
      case 'employee':
        return [
          ...baseTabs.slice(0, 1),
          { id: 'career', label: 'Career History', icon: Briefcase, color: 'blue', count: profile.workHistory?.length || 0 },
          { id: 'skills', label: 'Skills & Expertise', icon: GraduationCap, color: 'blue', count: profile.skills?.length || 0 },
          { id: 'open-source', label: 'Open Source', icon: Code, color: 'blue', count: profile.openSource?.length || 0 },
          ...baseTabs.slice(1)
        ];
      
      case 'investor':
        return [
          ...baseTabs.slice(0, 1),
          { id: 'career', label: 'Career History', icon: Briefcase, color: 'blue', count: profile.workHistory?.length || 0 },
          { id: 'portfolio', label: 'Investment Portfolio', icon: PieChart, color: 'blue', count: profile.portfolio?.length || 0 },
          { id: 'deals', label: 'Deal Flow', icon: Target, color: 'blue', count: profile.stats?.activeDeals || 0 },
          { id: 'board', label: 'Board Positions', icon: Building, color: 'blue', count: profile.boardPositions?.length || 0 },
          ...baseTabs.slice(1)
        ];
      
      case 'unemployed':
        return [
          ...baseTabs.slice(0, 1),
          { id: 'projects', label: 'Projects', icon: Code, color: 'blue', count: profile.projects?.length || 0 },
          { id: 'job-search', label: 'Job Search', icon: Search, color: 'blue', count: profile.stats?.applicationsSent || 0 },
          ...baseTabs.slice(1)
        ];
      
      default:
        return baseTabs;
    }
  };

  const tabs = getTabsForUserType(userType, userProfile);




  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    profileVisibility: 'ecosystem',
    dataSharing: true,
    aiInsights: true,
    notifications: {
      startupUpdates: true,
      networkActivity: true,
      aiRecommendations: true,
      ecosystemNews: true
    }
  });

  const [networkConnections, setNetworkConnections] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'CEO at TechFlow',
      avatar: '👩‍💼',
      connectionType: 'Founder',
      mutualConnections: 12,
      lastInteraction: '2 days ago',
      status: 'active',
      location: 'San Francisco, CA',
      industry: 'SaaS',
      skills: ['Product Management', 'Growth Strategy', 'AI/ML']
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      role: 'CTO at DataFlow',
      avatar: '👨‍💻',
      connectionType: 'Technical',
      mutualConnections: 8,
      lastInteraction: '1 week ago',
      status: 'active',
      location: 'Austin, TX',
      industry: 'Data Analytics',
      skills: ['Backend Development', 'AI/ML', 'System Architecture']
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'VP Marketing at GrowthCo',
      avatar: '👩‍🎨',
      connectionType: 'Marketing',
      mutualConnections: 15,
      lastInteraction: '3 days ago',
      status: 'active',
      location: 'New York, NY',
      industry: 'Marketing Tech',
      skills: ['Growth Marketing', 'Brand Strategy', 'Content Marketing']
    }
  ]);

  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: 'StartupOS Pioneer',
      description: 'First 100 users to join the platform',
      icon: '🚀',
      category: 'Platform',
      rarity: 'legendary',
      earnedDate: '2023-01-15',
      points: 1000,
      progress: 100
    },
    {
      id: 2,
      title: 'AI Tool Creator',
      description: 'Created 10+ AI-powered tools',
      icon: '🤖',
      category: 'AI',
      rarity: 'epic',
      earnedDate: '2023-03-20',
      points: 750,
      progress: 100
    },
    {
      id: 3,
      title: 'Ecosystem Connector',
      description: 'Connected 100+ startups',
      icon: '🌐',
      category: 'Network',
      rarity: 'rare',
      earnedDate: '2023-06-10',
      points: 500,
      progress: 100
    },
    {
      id: 4,
      title: 'M&A Expert',
      description: 'Completed 3 successful acquisitions',
      icon: '💼',
      category: 'M&A',
      rarity: 'epic',
      earnedDate: '2023-08-15',
      points: 800,
      progress: 100
    },
    {
      id: 5,
      title: 'Team Builder',
      description: 'Built teams of 50+ members',
      icon: '👥',
      category: 'Leadership',
      rarity: 'rare',
      earnedDate: '2023-09-30',
      points: 600,
      progress: 100
    },
    {
      id: 6,
      title: 'Growth Hacker',
      description: 'Achieved 500% growth in 6 months',
      icon: '📈',
      category: 'Growth',
      rarity: 'legendary',
      earnedDate: '2023-11-20',
      points: 1200,
      progress: 100
    }
  ]);

  const [profileAnalytics, setProfileAnalytics] = useState({
    views: {
      total: 1250,
      thisMonth: 89,
      thisWeek: 23,
      today: 5
    },
    connections: {
      total: 450,
      newThisMonth: 12,
      pending: 8,
      accepted: 4
    },
    engagement: {
      profileViews: 89,
      messageReplies: 23,
      postLikes: 156,
      commentReplies: 34
    },
    growth: {
      profileScore: 94.2,
      networkScore: 87.5,
      influenceScore: 91.8,
      activityScore: 89.3
    },
    trends: {
      profileViews: [45, 52, 38, 67, 89, 78, 91],
      connections: [12, 15, 8, 22, 18, 25, 19],
      engagement: [34, 41, 28, 56, 48, 62, 58]
    }
  });

  const handleProfileUpdate = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 relative overflow-hidden border border-gray-200 shadow-sm"
      >
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center text-4xl border border-gray-300 shadow-sm">
                  {userProfile.avatar}
                </div>
                <motion.button
                  className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Camera size={18} />
                </motion.button>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{userProfile.firstName} {userProfile.lastName}</h1>
                <p className="text-base text-gray-700 font-medium mb-1">{userProfile.title}</p>
                <p className="text-sm text-gray-600">{userProfile.company}</p>
                <div className="flex items-center space-x-3 mt-3 text-sm">
                  <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                    <MapPin size={14} className="text-gray-600" />
                    <span className="text-gray-700">{userProfile.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                    <Calendar size={14} className="text-gray-600" />
                    <span className="text-gray-700">StartupOS since {userProfile.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
            <motion.button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all shadow-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isEditing ? <Save size={18} /> : <Edit3 size={18} />}
              <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
            </motion.button>
          </div>
          
          {/* Bio */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-700 leading-relaxed">{userProfile.bio}</p>
          </div>
        </div>
      </motion.div>

      {/* StartupOS Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-gray-900">{userProfile.stats.ecosystemScore}</div>
            <div className="text-2xl">🏆</div>
          </div>
          <div className="text-sm text-blue-600 font-medium">Ecosystem Score</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-gray-900">{userProfile.stats.aiToolsBuilt}</div>
            <div className="text-2xl">🤖</div>
          </div>
          <div className="text-sm text-blue-600 font-medium">AI Tools Built</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-gray-900">{userProfile.stats.startupsConnected}</div>
            <div className="text-2xl">🌐</div>
          </div>
          <div className="text-sm text-blue-600 font-medium">Startups Connected</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-gray-900">{userProfile.stats.successRate}%</div>
            <div className="text-2xl">📈</div>
          </div>
          <div className="text-sm text-blue-600 font-medium">Success Rate</div>
        </div>
      </motion.div>

      {/* StartupOS Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">StartupOS Achievements</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {userProfile.achievements.slice(0, 6).map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-sm hover:border-gray-300 transition-all cursor-pointer"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl border border-gray-200 flex-shrink-0">
                {achievement.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm">{achievement.title}</h4>
                <p className="text-xs text-gray-600 truncate">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Real-time Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="text-blue-600" size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Real-time Activity</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-600">Live</span>
          </div>
        </div>
        
        <div className="space-y-2">
          {realTimeActivity.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer border border-gray-200"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl border border-gray-200 flex-shrink-0">
                  {activity.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full flex-shrink-0 ml-3 bg-blue-500"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  );

  const renderStartupPortfolio = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Startup Portfolio</h3>
          <motion.button
            className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-all flex items-center space-x-2 font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={18} />
            <span>Add Startup</span>
          </motion.button>
        </div>
        
        <div className="space-y-4">
          {userProfile.startups.map((startup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h4 className="text-xl font-bold text-gray-900">{startup.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      startup.status === 'active' 
                        ? 'bg-blue-600 text-blue-600' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {startup.status === 'active' ? 'Active' : 'Exited'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{startup.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Role</div>
                      <div className="font-medium">{startup.role}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Stage</div>
                      <div className="font-medium">{startup.stage}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Equity</div>
                      <div className="font-medium">{startup.equity}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Team Size</div>
                      <div className="font-medium">{startup.teamSize}</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {startup.status === 'active' ? startup.valuation : startup.exitValue}
                  </div>
                  <div className="text-sm text-gray-500">
                    {startup.status === 'active' ? 'Current Valuation' : 'Exit Value'}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderCareerHistory = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Career History</h3>
        
        <div className="space-y-8">
          {userProfile.workHistory?.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-l-4 border-blue-500 pl-6 pb-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900">{job.role}</h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="text-blue-600 font-medium text-lg">{job.company}</p>
                    {job.verified && <CheckCircle size={16} className="text-blue-600" />}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                    <span>{job.duration}</span>
                    {job.location && <span>• {job.location}</span>}
                    {job.employmentType && <span>• {job.employmentType}</span>}
                  </div>
                  {job.companySize && (
                    <p className="text-sm text-gray-600 mb-2">{job.companySize} • {job.industry}</p>
                  )}
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    index === 0 ? 'bg-blue-600 text-blue-600' : 
                    job.employmentType === 'Internship' ? 'bg-blue-600 text-blue-600' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {index === 0 ? 'Current' : job.employmentType === 'Internship' ? 'Internship' : 'Previous'}
                  </span>
                  {job.salary && (
                    <span className="text-sm font-medium text-gray-700">{job.salary}</span>
                  )}
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Award size={16} className="mr-2 text-blue-600" />
                    Key Achievements
                  </h5>
                  <ul className="space-y-2">
                    {job.achievements.map((achievement, aIndex) => (
                      <li key={aIndex} className="flex items-start space-x-3 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {job.technologies && job.technologies.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Code size={16} className="mr-2 text-blue-600" />
                      Technologies Used
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech, tIndex) => (
                        <span key={tIndex} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {job.recommendations && job.recommendations.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Star size={16} className="mr-2 text-blue-600" />
                      Recommendations
                    </h5>
                    <div className="space-y-3">
                      {job.recommendations.map((rec, rIndex) => (
                        <div key={rIndex} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium text-gray-900">{rec.author}</p>
                              <p className="text-sm text-gray-600">{rec.role}</p>
                            </div>
                            <span className="text-xs text-gray-500">{rec.date}</span>
                          </div>
                          <p className="text-sm text-gray-700 italic">"{rec.text}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {job.linkedinUrl && (
                  <div className="pt-2">
                    <a 
                      href={job.linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      View on LinkedIn
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Skills & Expertise</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Technical Skills</h4>
            <div className="flex flex-wrap gap-2">
              {userProfile.skills?.map((skill, index) => (
                <span key={index} className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Interests</h4>
            <div className="flex flex-wrap gap-2">
              {userProfile.interests?.map((interest, index) => (
                <span key={index} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Investment Portfolio</h3>
        
        <div className="space-y-4">
          {userProfile.portfolio?.map((investment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{investment.name}</h4>
                  <p className="text-sm text-gray-600">{investment.sector}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{investment.return}</div>
                  <div className="text-sm text-gray-500">Return</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Stage</div>
                  <div className="font-medium">{investment.stage}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Investment</div>
                  <div className="font-medium">{investment.investment}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Valuation</div>
                  <div className="font-medium">{investment.valuation}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Status</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    investment.status === 'Active' ? 'bg-blue-600 text-blue-600' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {investment.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderDeals = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Deal Flow</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl">
            <div className="text-3xl font-bold text-blue-600">{userProfile.stats?.activeDeals || 0}</div>
            <div className="text-sm text-blue-700 font-medium">Active Deals</div>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="text-3xl font-bold text-blue-600">{userProfile.stats?.successfulExits || 0}</div>
            <div className="text-sm text-blue-600 font-medium">Successful Exits</div>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="text-3xl font-bold text-blue-600">{userProfile.stats?.averageReturn || '0x'}</div>
            <div className="text-sm text-blue-600 font-medium">Average Return</div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Projects</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userProfile.projects?.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-bold text-gray-900">{project.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Completed' ? 'bg-blue-600 text-blue-600' : 'bg-blue-600 text-blue-600'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="space-y-3 mb-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Technologies</div>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech, tIndex) => (
                      <span key={tIndex} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-center"
                >
                  View Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderJobSearch = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Job Search Progress</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-xl">
            <div className="text-3xl font-bold text-blue-600">{userProfile.stats?.applicationsSent || 0}</div>
            <div className="text-sm text-blue-700 font-medium">Applications Sent</div>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="text-3xl font-bold text-blue-600">{userProfile.stats?.interviews || 0}</div>
            <div className="text-sm text-blue-600 font-medium">Interviews</div>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="text-3xl font-bold text-blue-600">{userProfile.stats?.projectsBuilt || 0}</div>
            <div className="text-sm text-blue-600 font-medium">Projects Built</div>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="text-3xl font-bold text-blue-600">{userProfile.stats?.monthsSearching || 0}</div>
            <div className="text-sm text-blue-600 font-medium">Months Searching</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Status</h4>
              <p className="text-sm text-gray-600">{userProfile.status}</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {userProfile.availability}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Expected Salary</h4>
              <p className="text-sm text-gray-600">{userProfile.expectedSalary}</p>
            </div>
          </div>
        </div>

        {/* Job Applications */}
        {userProfile.jobApplications && (
          <div className="mt-8">
            <h4 className="font-semibold text-gray-900 mb-4">Recent Applications</h4>
            <div className="space-y-3">
              {userProfile.jobApplications.map((app, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900">{app.position} at {app.company}</h5>
                    <p className="text-sm text-gray-600">Applied {app.appliedDate} • {app.salary}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    app.status === 'Interview' ? 'bg-blue-100 text-blue-700' :
                    app.status === 'Applied' ? 'bg-blue-600 text-blue-600' :
                    'bg-blue-600 text-black'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderCredentials = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Professional Credentials</h3>
        
        {/* Education */}
        {userProfile.credentials?.education && userProfile.credentials.education.length > 0 && (
          <div className="mb-8">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <GraduationCap size={20} className="mr-2 text-blue-600" />
              Education
            </h4>
            <div className="space-y-4">
              {userProfile.credentials.education.map((edu, index) => (
                <div key={index} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h5 className="font-medium text-gray-900">{edu.degree}</h5>
                      {edu.verified && <CheckCircle size={16} className="text-blue-600" />}
                    </div>
                    <p className="text-blue-600 font-medium">{edu.institution}</p>
                    <p className="text-sm text-gray-600">{edu.year} • GPA: {edu.gpa}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {userProfile.credentials?.certifications && userProfile.credentials.certifications.length > 0 && (
          <div className="mb-8">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Award size={20} className="mr-2 text-blue-600" />
              Certifications
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userProfile.credentials.certifications.map((cert, index) => (
                <div key={index} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h5 className="font-medium text-gray-900">{cert.name}</h5>
                      {cert.verified && <CheckCircle size={16} className="text-blue-600" />}
                    </div>
                    <p className="text-sm text-gray-600">{cert.issuer} • {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {userProfile.credentials?.awards && userProfile.credentials.awards.length > 0 && (
          <div className="mb-8">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Star size={20} className="mr-2 text-blue-600" />
              Awards & Recognition
            </h4>
            <div className="space-y-3">
              {userProfile.credentials.awards.map((award, index) => (
                <div key={index} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h5 className="font-medium text-gray-900">{award.title}</h5>
                      {award.verified && <CheckCircle size={16} className="text-blue-600" />}
                    </div>
                    <p className="text-sm text-gray-600">{award.year} • {award.category}</p>
                    {award.company && <p className="text-sm text-blue-600">{award.company}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publications */}
        {userProfile.credentials?.publications && userProfile.credentials.publications.length > 0 && (
          <div className="mb-8">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <FileText size={20} className="mr-2 text-blue-600" />
              Publications
            </h4>
            <div className="space-y-3">
              {userProfile.credentials.publications.map((pub, index) => (
                <div key={index} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h5 className="font-medium text-gray-900">{pub.title}</h5>
                      {pub.verified && <CheckCircle size={16} className="text-blue-600" />}
                    </div>
                    <p className="text-sm text-gray-600">{pub.publisher} • {pub.year}</p>
                    {pub.url && (
                      <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                        Read Article →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderOpenSource = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Open Source Contributions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userProfile.openSource?.map((repo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-bold text-gray-900">{repo.name}</h4>
                {repo.verified && <CheckCircle size={16} className="text-blue-600" />}
              </div>
              
              <p className="text-gray-600 mb-4">{repo.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-blue-600" />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitBranch size={14} className="text-gray-400" />
                    <span>{repo.forks}</span>
                  </div>
                </div>
                <span className="text-xs">Last commit: {repo.lastCommit}</span>
              </div>

              <div className="flex items-center space-x-2">
                <a 
                  href={`https://github.com/themeetpatel/${repo.name}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-center"
                >
                  View on GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderBoardPositions = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Board Positions</h3>
        
        <div className="space-y-4">
          {userProfile.boardPositions?.map((position, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-gray-900">{position.company}</h4>
                  {position.verified && <CheckCircle size={16} className="text-blue-600" />}
                </div>
                <p className="text-sm text-gray-600">{position.role} • Since {position.since}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                position.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {position.status}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderMediaMentions = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Media & News Mentions</h3>
        
        <div className="space-y-4">
          {userProfile.mediaMentions?.map((mention, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h5 className="font-medium text-gray-900">{mention.title}</h5>
                  {mention.verified && <CheckCircle size={16} className="text-blue-600" />}
                </div>
                <p className="text-sm text-gray-600 mb-1">{mention.source} • {mention.date}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  mention.type === 'funding' ? 'bg-green-100 text-green-700' :
                  mention.type === 'profile' ? 'bg-blue-100 text-blue-700' :
                  mention.type === 'recognition' ? 'bg-purple-100 text-purple-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {mention.type}
                </span>
              </div>
              {mention.url && (
                <a 
                  href={mention.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderAITools = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">AI Tools Created</h3>
          <motion.button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Brain size={16} />
            <span>Create New Tool</span>
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userProfile.aiTools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-bold text-gray-900">{tool.name}</h4>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {tool.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Download size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{tool.downloads}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-blue-600 fill-current" />
                    <span className="text-sm text-gray-600">{tool.rating}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  tool.status === 'published' 
                    ? 'bg-blue-600 text-blue-600' 
                    : 'bg-blue-600 text-blue-600'
                }`}>
                  {tool.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );









  const renderNetwork = () => (
    <div className="space-y-6">
      {/* Community Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Community Hub</h3>
            <p className="text-blue-100">Connect, collaborate, and grow with your professional network</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all border border-white/30">
              <Plus size={20} className="inline mr-2" />
              Invite Connections
            </button>
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all font-medium">
              <Search size={20} className="inline mr-2" />
              Discover
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{userProfile.connections?.total || 0}</div>
            <div className="text-blue-100 text-sm">Total Connections</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{userProfile.connections?.founders || 0}</div>
            <div className="text-blue-100 text-sm">Founders</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{userProfile.connections?.investors || 0}</div>
            <div className="text-blue-100 text-sm">Investors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{userProfile.connections?.mentors || 0}</div>
            <div className="text-blue-100 text-sm">Mentors</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h4 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100">
            <Users size={24} className="text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Find Mentors</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
            <Handshake size={24} className="text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Partnerships</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
            <Calendar size={24} className="text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Events</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
            <MessageCircle size={24} className="text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Discussions</span>
          </button>
        </div>
      </motion.div>

      {/* Recent Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-bold text-gray-900">Recent Activity</h4>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
        </div>
        
        <div className="space-y-4">
          {realTimeActivity.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                {activity.avatar}
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Heart size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <MessageCircle size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Featured Connections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-bold text-gray-900">Featured Connections</h4>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">All</button>
            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">Founders</button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">Investors</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {networkConnections.slice(0, 6).map((connection, index) => (
            <motion.div
              key={connection.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {connection.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{connection.name}</h4>
                  <p className="text-sm text-gray-600">{connection.role}</p>
                  <p className="text-xs text-gray-500">{connection.company}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Connection Type</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {connection.connectionType}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Mutual Connections</span>
                  <span className="font-medium text-gray-900">{connection.mutualConnections}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Industry</span>
                  <span className="font-medium text-gray-900">{connection.industry}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Last Active</span>
                  <span className="text-blue-600 font-medium">{connection.lastActive}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  <MessageCircle size={16} className="inline mr-2" />
                  Message
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                  <User size={16} className="inline mr-2" />
                  Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Community Groups & Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Groups */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-gray-900">My Groups</h4>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'AI & Machine Learning Founders', members: 1250, posts: 45, type: 'Founder' },
              { name: 'SaaS Growth Strategies', members: 890, posts: 23, type: 'Growth' },
              { name: 'Venture Capital Network', members: 2100, posts: 67, type: 'Investment' },
              { name: 'Tech Mentorship Circle', members: 456, posts: 12, type: 'Mentorship' }
            ].map((group, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {group.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900">{group.name}</h5>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{group.members} members</span>
                    <span>•</span>
                    <span>{group.posts} new posts</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  group.type === 'Founder' ? 'bg-blue-600 text-blue-600' :
                  group.type === 'Growth' ? 'bg-blue-100 text-blue-700' :
                  group.type === 'Investment' ? 'bg-blue-600 text-blue-600' :
                  'bg-blue-600 text-blue-600'
                }`}>
                  {group.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-gray-900">Upcoming Events</h4>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            {[
              { title: 'AI Startup Pitch Night', date: 'Jan 25, 2024', time: '6:00 PM', location: 'San Francisco', attendees: 120 },
              { title: 'VC Office Hours', date: 'Jan 28, 2024', time: '2:00 PM', location: 'Virtual', attendees: 45 },
              { title: 'Founder Networking Mixer', date: 'Feb 2, 2024', time: '7:00 PM', location: 'Palo Alto', attendees: 200 },
              { title: 'Growth Hacking Workshop', date: 'Feb 5, 2024', time: '10:00 AM', location: 'Virtual', attendees: 85 }
            ].map((event, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{event.title}</h5>
                  <span className="text-xs text-gray-500">{event.attendees} attending</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {event.date}
                  </span>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {event.time}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-1" />
                  {event.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Recommendations & Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h4 className="text-lg font-bold text-gray-900 mb-6">Recommended for You</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Sarah Chen', role: 'VP Engineering at TechCorp', mutual: 12, reason: 'Mutual connections in AI/ML' },
            { name: 'Michael Rodriguez', role: 'Partner at VC Fund', mutual: 8, reason: 'Similar investment interests' },
            { name: 'Jennifer Liu', role: 'Founder at StartupXYZ', mutual: 15, reason: 'Same industry focus' },
            { name: 'David Kim', role: 'CTO at DataTech', mutual: 6, reason: 'Technical background match' },
            { name: 'Alex Johnson', role: 'Product Manager at Meta', mutual: 9, reason: 'Shared professional interests' },
            { name: 'Maria Garcia', role: 'Investor at Sequoia', mutual: 11, reason: 'Portfolio company overlap' }
          ].map((person, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                {person.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h5 className="font-medium text-gray-900">{person.name}</h5>
                <p className="text-sm text-gray-600">{person.role}</p>
                <p className="text-xs text-gray-500">{person.reason}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                  Connect
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Achievements</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Total Points:</span>
            <span className="text-2xl font-bold text-blue-600">
              {achievements.reduce((sum, achievement) => sum + achievement.points, 0)}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-xl p-6 hover:shadow-md transition-all ${
                achievement.rarity === 'legendary' ? 'border-purple-200 bg-purple-50' :
                achievement.rarity === 'epic' ? 'border-blue-200 bg-blue-50' :
                achievement.rarity === 'rare' ? 'border-green-200 bg-green-50' :
                'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-3xl">{achievement.icon}</div>
                <div>
                  <h4 className="font-bold text-gray-900">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium">{achievement.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Points:</span>
                  <span className="font-bold text-blue-600">{achievement.points}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Earned:</span>
                  <span className="font-medium">{achievement.earnedDate}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Profile Analytics</h3>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-blue-600">{profileAnalytics.views.total}</div>
              <Eye size={24} className="text-blue-600" />
            </div>
            <div className="text-sm text-blue-700 font-medium">Total Views</div>
            <div className="text-xs text-blue-600 mt-1">+{profileAnalytics.views.thisMonth} this month</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-blue-600">{profileAnalytics.connections.total}</div>
              <Users size={24} className="text-blue-600" />
            </div>
            <div className="text-sm text-blue-600 font-medium">Connections</div>
            <div className="text-xs text-blue-600 mt-1">+{profileAnalytics.connections.newThisMonth} new</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-blue-600">{profileAnalytics.engagement.profileViews}</div>
              <BarChart3 size={24} className="text-blue-600" />
            </div>
            <div className="text-sm text-blue-600 font-medium">Engagement</div>
            <div className="text-xs text-blue-600 mt-1">This month</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-blue-600">{profileAnalytics.growth.profileScore}</div>
              <TrendingUp size={24} className="text-blue-600" />
            </div>
            <div className="text-sm text-blue-600 font-medium">Profile Score</div>
            <div className="text-xs text-blue-600 mt-1">Top 5%</div>
          </div>
        </div>

        {/* Growth Trends */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Profile Views Trend</h4>
            <div className="space-y-2">
              {profileAnalytics.trends.profileViews.map((value, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500 w-16">Week {index + 1}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(value / 100) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-8">{value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Connection Growth</h4>
            <div className="space-y-2">
              {profileAnalytics.trends.connections.map((value, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500 w-16">Week {index + 1}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(value / 30) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-8">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Profile Settings</h3>
        
        <div className="space-y-6">
          {/* User Type */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">User Type</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="userType"
                  value="founder"
                  checked={userProfile.userType === 'founder'}
                  onChange={(e) => {
                    actions.setUserType(e.target.value);
                    setUserProfile(prev => ({ ...prev, userType: e.target.value }));
                  }}
                  className="text-blue-600"
                />
                <span>Founder - Building and scaling startups</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="userType"
                  value="employee"
                  checked={userProfile.userType === 'employee'}
                  onChange={(e) => {
                    actions.setUserType(e.target.value);
                    setUserProfile(prev => ({ ...prev, userType: e.target.value }));
                  }}
                  className="text-blue-600"
                />
                <span>Employee - Working at startups or companies</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="userType"
                  value="investor"
                  checked={userProfile.userType === 'investor'}
                  onChange={(e) => {
                    actions.setUserType(e.target.value);
                    setUserProfile(prev => ({ ...prev, userType: e.target.value }));
                  }}
                  className="text-blue-600"
                />
                <span>Investor - Funding and supporting startups</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="userType"
                  value="unemployed"
                  checked={userProfile.userType === 'unemployed'}
                  onChange={(e) => {
                    actions.setUserType(e.target.value);
                    setUserProfile(prev => ({ ...prev, userType: e.target.value }));
                  }}
                  className="text-blue-600"
                />
                <span>Job Seeker - Looking for opportunities</span>
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              This determines your WorkHub experience and available features.
            </p>
          </div>

          {/* Profile Visibility */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Profile Visibility</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={preferences.profileVisibility === 'public'}
                  onChange={(e) => setPreferences(prev => ({ ...prev, profileVisibility: e.target.value }))}
                  className="text-blue-600"
                />
                <span>Public - Visible to everyone</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="visibility"
                  value="ecosystem"
                  checked={preferences.profileVisibility === 'ecosystem'}
                  onChange={(e) => setPreferences(prev => ({ ...prev, profileVisibility: e.target.value }))}
                  className="text-blue-600"
                />
                <span>Ecosystem - Visible to StartupOS users only</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={preferences.profileVisibility === 'private'}
                  onChange={(e) => setPreferences(prev => ({ ...prev, profileVisibility: e.target.value }))}
                  className="text-blue-600"
                />
                <span>Private - Visible to connections only</span>
              </label>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Notifications</h4>
            <div className="space-y-3">
              {Object.entries(preferences.notifications).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, [key]: e.target.checked }
                    }))}
                    className="text-blue-600"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Data Sharing */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Data Sharing</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span>Share profile data for AI insights</span>
                <input
                  type="checkbox"
                  checked={preferences.dataSharing}
                  onChange={(e) => setPreferences(prev => ({ ...prev, dataSharing: e.target.checked }))}
                  className="text-blue-600"
                />
              </label>
              <label className="flex items-center justify-between">
                <span>Enable AI-powered recommendations</span>
                <input
                  type="checkbox"
                  checked={preferences.aiInsights}
                  onChange={(e) => setPreferences(prev => ({ ...prev, aiInsights: e.target.checked }))}
                  className="text-blue-600"
                />
              </label>
            </div>
          </div>

          {/* Theme */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Theme</h4>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPreferences(prev => ({ ...prev, theme: 'light' }))}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  preferences.theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setPreferences(prev => ({ ...prev, theme: 'dark' }))}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  preferences.theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Dark
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'startup': return renderStartupPortfolio();
      case 'career': return renderCareerHistory();
      case 'skills': return renderSkills();
      case 'open-source': return renderOpenSource();
      case 'portfolio': return renderPortfolio();
      case 'deals': return renderDeals();
      case 'board': return renderBoardPositions();
      case 'projects': return renderProjects();
      case 'job-search': return renderJobSearch();
      case 'ai-tools': return renderAITools();
      case 'credentials': return renderCredentials();
      case 'media': return renderMediaMentions();
      case 'achievements': return renderAchievements();
      case 'analytics': return renderAnalytics();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sticky top-24">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition-all text-left text-sm ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon size={18} />
                        <span>{tab.label}</span>
                      </div>
                      {tab.count !== null && tab.count !== undefined && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          activeTab === tab.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderCurrentTab()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;

