import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Users, CheckCircle, Brain, ArrowRight } from 'lucide-react';

const AICoBuilderMarketplace = ({ 
  employees, 
  categories, 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  onEmployeeClick 
}) => {
  const [currentOKRIndex, setCurrentOKRIndex] = useState(0);

  const okrs = [
    {
      id: 1,
      title: "Increase Monthly Active Users by 40%",
      description: "Focus on user acquisition, engagement, and retention strategies",
      recommendations: [
        "Marketing specialists for user acquisition",
        "Data analysts for engagement insights", 
        "Product managers for retention strategies"
      ],
      recommendedEmployees: [1, 2, 6]
    },
    {
      id: 2,
      title: "Reduce Customer Churn Rate to <5%",
      description: "Improve customer success and support processes",
      recommendations: [
        "Customer success specialists for retention",
        "Data analysts for churn prediction",
        "Product managers for user experience improvements"
      ],
      recommendedEmployees: [3, 2, 6]
    },
    {
      id: 3,
      title: "Launch 3 New Product Features",
      description: "Accelerate product development and innovation",
      recommendations: [
        "Product managers for feature planning",
        "UI/UX designers for user experience",
        "Developers for technical implementation"
      ],
      recommendedEmployees: [6, 4, 1]
    },
    {
      id: 4,
      title: "Increase Revenue by 60%",
      description: "Focus on sales growth and revenue optimization",
      recommendations: [
        "Sales specialists for revenue growth",
        "Marketing specialists for lead generation",
        "Data analysts for revenue insights"
      ],
      recommendedEmployees: [1, 2, 5]
    },
    {
      id: 5,
      title: "Improve Team Productivity by 30%",
      description: "Optimize internal processes and team efficiency",
      recommendations: [
        "Project managers for process optimization",
        "DevOps engineers for automation",
        "Data analysts for performance metrics"
      ],
      recommendedEmployees: [5, 2, 6]
    }
  ];

  const filteredEmployees = useMemo(() => {
    let filtered = employees;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(emp => emp.department?.toLowerCase() === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(emp => 
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
  }, [employees, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search AI employees by name, role, or skills..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
          <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total AI Employees</p>
              <p className="text-2xl font-bold">{employees.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Available Now</p>
              <p className="text-2xl font-bold">{employees.filter(emp => emp.isActive).length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Avg. Rating</p>
              <p className="text-2xl font-bold">
                {(employees.reduce((acc, emp) => acc + emp.rating, 0) / employees.length).toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Success Rate</p>
              <p className="text-2xl font-bold">
                {Math.round(employees.reduce((acc, emp) => acc + emp.successRate, 0) / employees.length)}%
              </p>
            </div>
            <Star className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6" />
            <h3 className="text-lg font-semibold">AI Recommendation for Your Business</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentOKRIndex(Math.max(0, currentOKRIndex - 1))}
              disabled={currentOKRIndex === 0}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            <span className="text-sm font-medium">
              {currentOKRIndex + 1} of {okrs.length}
            </span>
            <button
              onClick={() => setCurrentOKRIndex(Math.min(okrs.length - 1, currentOKRIndex + 1))}
              disabled={currentOKRIndex === okrs.length - 1}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* OKR Progress Dots */}
        <div className="flex justify-center space-x-2 mb-6">
          {okrs.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentOKRIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentOKRIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Based on your OKR: "{okrs[currentOKRIndex].title}"</h4>
            <p className="text-purple-100 text-sm mb-3">
              {okrs[currentOKRIndex].description}
            </p>
            <div className="space-y-2">
              {okrs[currentOKRIndex].recommendations.map((rec, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-300" />
                  <span className="text-sm">{rec}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Recommended AI Employees</h4>
            <div className="space-y-2">
              {okrs[currentOKRIndex].recommendedEmployees.map((empId, index) => {
                const emp = employees.find(e => e.id === empId);
                if (!emp) return null;
                return (
                  <div 
                    key={index} 
                    onClick={() => onEmployeeClick(emp)}
                    className="flex items-center space-x-3 p-2 bg-white/20 rounded-lg hover:bg-white/30 cursor-pointer transition-colors"
                  >
                    <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{emp.name}</div>
                      <div className="text-xs text-purple-200">{emp.role}</div>
                    </div>
                    <div className="text-xs">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{emp.rating}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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
                  employee.badgeColor === 'green' ? 'bg-green-100 text-green-800' :
                  employee.badgeColor === 'blue' ? 'bg-blue-100 text-blue-800' :
                  employee.badgeColor === 'purple' ? 'bg-purple-100 text-purple-800' :
                  employee.badgeColor === 'red' ? 'bg-red-100 text-red-800' :
                  'bg-teal-100 text-teal-800'
                }`}>
                  {employee.badge}
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
                    <span className="text-xs text-gray-500">({employee.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-green-600">
                  <Users className="w-3 h-3" />
                  <span className="text-xs font-medium">{employee.users} users</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-lg font-bold text-gray-900">${employee.hourlyRate}</p>
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

export default AICoBuilderMarketplace;
