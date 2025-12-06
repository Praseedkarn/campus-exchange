// Mock API service for frontend development
const users = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@college.edu',
    college: 'University of Technology',
    collegeId: 'CSE2023001',
    phone: '9876543210',
    userType: 'student',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    isVerified: true
  },
  {
    id: 2,
    firstName: 'Sarah',
    lastName: 'Smith',
    email: 'sarah@college.edu',
    college: 'State College of Engineering',
    collegeId: 'ECE2023002',
    phone: '9876543211',
    userType: 'seller',
    profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
    isVerified: true
  }
];

const products = [
  {
    id: 1,
    title: 'Calculus Textbook - 4th Edition',
    description: 'Brand new calculus textbook, never used. Perfect for engineering students.',
    price: 299,
    category: 'Books',
    condition: 'New',
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop'],
    sellerId: 1,
    sellerName: 'John Doe',
    college: 'University of Technology',
    status: 'available',
    location: 'Main Library',
    contactPhone: '9876543210',
    views: 45,
    isNegotiable: true,
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Gaming Laptop - RTX 3060',
    description: 'HP Omen gaming laptop, 1 year old, excellent condition. Includes charger.',
    price: 45999,
    category: 'Electronics',
    condition: 'Like New',
    images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w-400&h=400&fit=crop'],
    sellerId: 2,
    sellerName: 'Sarah Smith',
    college: 'State College of Engineering',
    status: 'available',
    location: 'Computer Science Block',
    contactPhone: '9876543211',
    views: 89,
    isNegotiable: false,
    createdAt: '2024-01-14'
  },
  {
    id: 3,
    title: 'Bicycle - Mountain Bike',
    description: 'Hero mountain bike, good condition, recently serviced. Great for campus commute.',
    price: 2500,
    category: 'Sports',
    condition: 'Good',
    images: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=400&fit=crop'],
    sellerId: 1,
    sellerName: 'John Doe',
    college: 'University of Technology',
    status: 'available',
    location: 'Sports Complex',
    contactPhone: '9876543210',
    views: 23,
    isNegotiable: true,
    createdAt: '2024-01-13'
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuthAPI = {
  login: async (credentials) => {
    await delay(800); // Simulate network delay
    
    const user = users.find(u => 
      u.email === credentials.email && 
      credentials.password === 'demo123' // All demo passwords are 'demo123'
    );
    
    if (user) {
      const token = `mock-jwt-token-${user.id}`;
      return {
        data: {
          success: true,
          message: 'Login successful',
          token,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            college: user.college,
            userType: user.userType,
            profilePicture: user.profilePicture
          }
        }
      };
    }
    
    throw {
      response: {
        data: {
          success: false,
          message: 'Invalid credentials'
        }
      }
    };
  },

  register: async (userData) => {
    await delay(800);
    
    // Check if email exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      throw {
        response: {
          data: {
            success: false,
            message: 'User already exists with this email'
          }
        }
      };
    }
    
    // Create new user
    const newUser = {
      id: users.length + 1,
      ...userData,
      isVerified: false,
      profilePicture: 'https://randomuser.me/api/portraits/lego/1.jpg'
    };
    
    users.push(newUser);
    
    const token = `mock-jwt-token-${newUser.id}`;
    return {
      data: {
        success: true,
        message: 'Registration successful',
        token,
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          college: newUser.college,
          userType: newUser.userType,
          isVerified: newUser.isVerified
        }
      }
    };
  },

  forgotPassword: async (email) => {
    await delay(800);
    
    const user = users.find(u => u.email === email);
    if (!user) {
      throw {
        response: {
          data: {
            success: false,
            message: 'No user found with this email'
          }
        }
      };
    }
    
    return {
      data: {
        success: true,
        message: 'Password reset email sent (mock)',
        resetToken: 'mock-reset-token-123'
      }
    };
  },

  resetPassword: async (token, password) => {
    await delay(800);
    
    return {
      data: {
        success: true,
        message: 'Password reset successful'
      }
    };
  },

  getProfile: async () => {
    await delay(600);
    
    // Get token from storage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      throw {
        response: {
          status: 401,
          data: { message: 'Not authenticated' }
        }
      };
    }
    
    const userId = parseInt(token.split('-').pop());
    const user = users.find(u => u.id === userId);
    
    return {
      data: {
        success: true,
        user
      }
    };
  }
};

export const mockProductAPI = {
  getAll: async () => {
    await delay(600);
    return {
      data: {
        success: true,
        count: products.length,
        products
      }
    };
  },

  getById: async (id) => {
    await delay(500);
    const product = products.find(p => p.id === id);
    
    if (!product) {
      throw {
        response: {
          data: { message: 'Product not found' }
        }
      };
    }
    
    return {
      data: {
        success: true,
        product
      }
    };
  },

  create: async (productData) => {
    await delay(800);
    
    // Get current user from token
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userId = token ? parseInt(token.split('-').pop()) : 1;
    const user = users.find(u => u.id === userId);
    
    const newProduct = {
      id: products.length + 1,
      ...productData,
      sellerId: user.id,
      sellerName: `${user.firstName} ${user.lastName}`,
      college: user.college,
      status: 'available',
      views: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    products.unshift(newProduct);
    
    return {
      data: {
        success: true,
        message: 'Product listed successfully',
        product: newProduct
      }
    };
  },

  getUserProducts: async () => {
    await delay(600);
    
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userId = token ? parseInt(token.split('-').pop()) : 1;
    
    const userProducts = products.filter(p => p.sellerId === userId);
    
    return {
      data: {
        success: true,
        products: userProducts
      }
    };
  }
};

// Mock API for categories
export const mockCategoryAPI = {
  getAll: async () => {
    await delay(300);
    return {
      data: {
        categories: [
          { id: 1, name: 'Books', icon: 'book', count: 12 },
          { id: 2, name: 'Electronics', icon: 'laptop', count: 24 },
          { id: 3, name: 'Furniture', icon: 'couch', count: 8 },
          { id: 4, name: 'Clothing', icon: 'tshirt', count: 15 },
          { id: 5, name: 'Sports', icon: 'futbol', count: 9 },
          { id: 6, name: 'Other', icon: 'ellipsis-h', count: 5 }
        ]
      }
    };
  }
};