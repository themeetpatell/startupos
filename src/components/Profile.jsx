import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  MapPin, 
  Globe, 
  Camera,
  Save,
  Edit,
  Shield,
  Bell,
  Lock
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@startupos.com',
    phone: '+1 (555) 123-4567',
    company: 'StartupOS Demo',
    position: 'Founder & CEO',
    location: 'San Francisco, CA',
    website: 'startupos.com',
    bio: 'Passionate entrepreneur building the future of startup operations. Focused on creating innovative solutions that help startups scale efficiently.',
    avatar: null
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Profile saved:', profile);
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Profile Settings
          </h1>
          <p className="text-xl text-gray-600">
            Manage your account information and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt={profile.name} className="w-32 h-32 rounded-3xl object-cover" />
                    ) : (
                      <User size={48} className="text-white" />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Camera size={20} className="text-gray-600" />
                  </button>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{profile.name}</h2>
                <p className="text-gray-600 mb-4">{profile.position}</p>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Building size={16} />
                    <span>{profile.company}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Globe size={16} />
                    <span>{profile.website}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                <div className="flex space-x-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                      >
                        <Save size={16} />
                        <span>Save Changes</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                    >
                      <Edit size={16} />
                      <span>Edit Profile</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={profile.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    value={profile.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    value={profile.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed resize-none"
                />
              </div>
            </div>

            {/* Security & Privacy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Security & Privacy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button className="flex items-center space-x-3 p-4 text-left hover:bg-gray-50 rounded-2xl transition-colors group">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Lock size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Change Password</div>
                    <div className="text-sm text-gray-500">Update your login credentials</div>
                  </div>
                </button>

                <button className="flex items-center space-x-3 p-4 text-left hover:bg-gray-50 rounded-2xl transition-colors group">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield size={24} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Two-Factor Auth</div>
                    <div className="text-sm text-gray-500">Add an extra layer of security</div>
                  </div>
                </button>

                <button className="flex items-center space-x-3 p-4 text-left hover:bg-gray-50 rounded-2xl transition-colors group">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Bell size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Notification Settings</div>
                    <div className="text-sm text-gray-500">Manage your alerts and emails</div>
                  </div>
                </button>

                <button className="flex items-center space-x-3 p-4 text-left hover:bg-gray-50 rounded-2xl transition-colors group">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Globe size={24} className="text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Privacy Settings</div>
                    <div className="text-sm text-gray-500">Control your data visibility</div>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
