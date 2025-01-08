const authMiddleware = (req, res, next) => {
    // Simulate authentication logic (replace with real authentication logic)
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized. No token provided.' });
    }
  
    try {
      // Simulated user (replace with token verification and user extraction)
      req.user = { id: 1, role: 'student' }; // Example user object
      next();
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized. Invalid token.' });
    }
  };
  
  module.exports = authMiddleware;
  