import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Users } from 'lucide-react';

const AICoBuilderTrends = ({ 
  trendsData, 
  searchQuery, 
  setSearchQuery, 
  trendsCategory, 
  setTrendsCategory,
  onEmployeeClick 
}) => {
  const filteredEmployees = useMemo(() => {
    let employees = trendsData[trendsCategory] || [];
    
    if (searchQuery) {
      employees = employees.filter(emp => 
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return employees;
  }, [trendsData, trendsCategory, searchQuery]);

  const getCategoryTitle = () => {
    const titles = {
      trending: '🔥 Trending AI Employees',
      popular: '⭐ Popular AI Employees',
      mutualConnections: '🤝 Mutual Connections Are Using',
      similarIndustries: '🏢 Similar Industries Are Using',
      newReleases: '🆕 New Releases',
      topRated: '🏆 Top Rated AI Employees'
    };
    return titles[trendsCategory] || 'AI Employees';
  };

  const getCategoryDescription = () => {
    const descriptions = {
      trending: 'AI employees gaining momentum and popularity',
      popular: 'Most used and trusted AI employees',
      mutualConnections: 'AI employees your network is using',
      similarIndustries: 'AI employees popular in your industry',
      newReleases: 'Fresh AI employees just added to the platform',
      topRated: 'Highest rated AI employees by users'
    };
    return descriptions[trendsCategory] || 'Discover AI employees';
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search trending AI employees..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={trendsCategory}
            onChange={(e) => setTrendsCategory(e.target.value)}
          >
            <option value="trending">🔥 Trending</option>
            <option value="popular">⭐ Popular</option>
            <option value="mutualConnections">🤝 Mutual Connections</option>
            <option value="similarIndustries">🏢 Similar Industries</option>
            <option value="newReleases">🆕 New Releases</option>
            <option value="topRated">🏆 Top Rated</option>
          </select>
          <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {getCategoryTitle()}
        </h2>
        <p className="text-gray-600">
          {getCategoryDescription()}
        </p>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <motion.div
            key={employee.id}
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => onEmployeeClick(employee)}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
          >
            <div className="relative p-6">
              <div className="absolute top-3 right-3 z-10">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  employee.trend === 'NEW' ? 'bg-green-100 text-green-800' :
                  employee.trend === 'TOP' ? 'bg-yellow-100 text-yellow-800' :
                  employee.trend?.includes('+') ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {employee.trend || 'TRENDING'}
                </span>
              </div>
              
              <div className="flex items-start space-x-3 mb-3">
                <img 
                  src={employee.avatar} 
                  alt={employee.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{employee.name}</h3>
                  <p className="text-sm text-gray-600">{employee.role}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-bold text-gray-900">{employee.rating}</span>
                    <span className="text-xs text-gray-500">({employee.users} users)</span>
                  </div>
                </div>
                {employee.mutualCount && (
                  <div className="flex items-center space-x-1 text-blue-500">
                    <Users className="w-3 h-3" />
                    <span className="text-xs font-medium">{employee.mutualCount} mutual</span>
                  </div>
                )}
                {employee.industry && (
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {employee.industry}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-lg font-bold text-gray-900">${employee.hourlyRate || 25}</p>
                  <p className="text-xs text-gray-500">per hour</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`Hiring ${employee.name}`);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Hire
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`Loving ${employee.name}`);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Love
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AICoBuilderTrends;
