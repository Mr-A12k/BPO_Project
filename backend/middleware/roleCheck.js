exports.isAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Requires Admin Role' });
    }
    next();
  };
  
  exports.isSupervisor = (req, res, next) => {
    if (req.userRole !== 'supervisor' && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Requires Supervisor Role' });
    }
    next();
  };
  
  exports.isAgent = (req, res, next) => {
    if (req.userRole !== 'agent' && req.userRole !== 'supervisor' && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Requires Agent Role' });
    }
    next();
  };