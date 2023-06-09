const urls = {
  auth: {
    login: "/auth/login/",
    signup: "/auth/signup",
    sellerSignUp: "/auth/seller/signup/",
    sellerLogin: "/auth/seller/login/",
    userUpdate: "/auth/user/profile/",
    sellerUpdate: "/auth/seller/profile/"
  },
  checkauth: {
    get: "/checkauth",
  },
  cart: {
    get: "/cartItems/",
    create: "/cartItem?id={id}",
    update: "/cartItem?id={id}",
    delete: "/cartItem?id={id}",
    deleteAll: "/cartItems/",
  },
  product: {
    get: "/products/?id={id}",
  },
  user: {
    get: "/auth/users",
  },
  order: {
    get: "/orders/",
    create: "/orders/?id={id}",
    createCart: "/orders/cart/",
    update: "/orders/?id={id}",
    delete: "/orders/?id={id}",
  },
  category: {
    get: "/categories/",
    create: "/categories/",
  },
  getDashboardData:{
    get: "/seller/dashboard/",
  },
  sellerOrders: {
    get: "/seller/orders/",
    patch: "/seller/orders/",
  },
  sellerProducts:{
    get: "/seller/products/?id={id}",
    add: "/seller/products/",
    update: "/seller/products/?id={id}",
    delete: "/seller/products/?id={id}",
  },

  review: {
    get: "/reviews/?id={id}",
    create: "/reviews/?id={id}",
    update: "/reviews/?id={id}",
    delete: "/reviews/?id={id}",
  },

};

export default urls;
