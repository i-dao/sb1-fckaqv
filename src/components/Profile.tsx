import React, { useState } from 'react';
import { UserCircle, Building2, Phone, Mail, MapPin, Calendar, Hash } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

interface ProfileData {
  personal: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    birthdate: string;
  };
  company: {
    name: string;
    address: string;
    registrationNumber: string;
    country: string;
  };
}

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    personal: {
      name: user?.username || '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      country: '',
      birthdate: '',
    },
    company: {
      name: '',
      address: '',
      registrationNumber: '',
      country: '',
    },
  });

  const handlePersonalChange = (field: keyof ProfileData['personal'], value: string) => {
    setProfileData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  const handleCompanyChange = (field: keyof ProfileData['company'], value: string) => {
    setProfileData(prev => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Profile data:', profileData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <UserCircle className="h-8 w-8 text-indigo-600" />
          <h2 className="text-2xl font-semibold text-gray-900">{t('profile.title', 'Profile Settings')}</h2>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {isEditing ? t('common.cancel') : t('profile.edit', 'Edit Profile')}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-6">
            <UserCircle className="h-6 w-6 text-indigo-600" />
            <h3 className="text-xl font-semibold text-gray-900">{t('profile.personal.title', 'Personal Information')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.personal.name', 'Full Name')}
              </label>
              <input
                type="text"
                value={profileData.personal.name}
                onChange={(e) => handlePersonalChange('name', e.target.value)}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.personal.email', 'Email Address')}
              </label>
              <input
                type="email"
                value={profileData.personal.email}
                onChange={(e) => handlePersonalChange('email', e.target.value)}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.personal.phone', 'Phone Number')}
              </label>
              <input
                type="tel"
                value={profileData.personal.phone}
                onChange={(e) => handlePersonalChange('phone', e.target.value)}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.personal.birthdate', 'Date of Birth')}
              </label>
              <input
                type="date"
                value={profileData.personal.birthdate}
                onChange={(e) => handlePersonalChange('birthdate', e.target.value)}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.personal.address', 'Address')}
              </label>
              <input
                type="text"
                value={profileData.personal.address}
                onChange={(e) => handlePersonalChange('address', e.target.value)}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.personal.city', 'City')}
              </label>
              <input
                type="text"
                value={profileData.personal.city}
                onChange={(e) => handlePersonalChange('city', e.target.value)}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.personal.country', 'Country')}
              </label>
              <input
                type="text"
                value={profileData.personal.country}
                onChange={(e) => handlePersonalChange('country', e.target.value)}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Building2 className="h-6 w-6 text-indigo-600" />
            <h3 className="text-xl font-semibold text-gray-900">{t('profile.company.title', 'Company Information')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.company.name', 'Company Name')}
              </label>
              <input
                type="text"
                value={profileData.company.name}
                onChange={(e) => handleCompanyChange('name', e.target.value)}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.company.address', 'Company Address')}
              </label>
              <input
                type="text"
                value={profileData.company.address}
                onChange={(e) => handleCompanyChange('address', e.target.value)}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.company.registrationNumber', 'Registration Number')}
              </label>
              <input
                type="text"
                value={profileData.company.registrationNumber}
                onChange={(e) => handleCompanyChange('registrationNumber', e.target.value)}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.company.country', 'Company Country')}
              </label>
              <input
                type="text"
                value={profileData.company.country}
                onChange={(e) => handleCompanyChange('country', e.target.value)}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {t('common.save')}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;