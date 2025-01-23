import JWT from 'jsonwebtoken';

// exports.protect = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Token invalid' });
//   }
// };


export function protect(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized, no token' });
  
    try {
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
  
      // Check if the user is an Admin
      if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Not an Admin' });
  
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token invalid' });
    }
  }
  