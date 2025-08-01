import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut,
  Download,
  Star,
  TrendingUp,
  RefreshCw
} from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  original_price?: number;
  rating: number;
  downloads: number;
  technologies: string[];
  features: string[];
  status: 'active' | 'inactive';
  image_url?: string;
  created_at: string;
  updated_at: string;
}

interface Order {
  id: string;
  product_id: string;
  amount: number;
  payment_status: string;
  customer_email: string;
  customer_name: string;
  created_at: string;
  products?: {
    title: string;
    price: number;
  };
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    category: '',
    price: 0,
    original_price: 0,
    technologies: '',
    features: '',
    status: 'active' as 'active' | 'inactive',
    image_url: ''
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
      return;
    }

    fetchData();
    setupRealtimeSubscriptions();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;

      // Fetch orders with product details
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          products (
            title,
            price
          )
        `)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      setProducts((productsData || []) as Product[]);
      setOrders((ordersData || []) as Order[]);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    // Subscribe to products changes
    const productsChannel = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          fetchData();
        }
      )
      .subscribe();

    // Subscribe to orders changes
    const ordersChannel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(productsChannel);
      supabase.removeChannel(ordersChannel);
    };
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/admin/login");
  };

  const handleAddProduct = async () => {
    if (!newProduct.title || !newProduct.description || !newProduct.category || newProduct.price <= 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .insert({
          title: newProduct.title,
          description: newProduct.description,
          category: newProduct.category,
          price: newProduct.price,
          original_price: newProduct.original_price || null,
          technologies: newProduct.technologies.split(',').map(t => t.trim()),
          features: newProduct.features.split(',').map(f => f.trim()),
          status: newProduct.status,
          image_url: newProduct.image_url || null
        });

      if (error) throw error;

      setNewProduct({
        title: '',
        description: '',
        category: '',
        price: 0,
        original_price: 0,
        technologies: '',
        features: '',
        status: 'active',
        image_url: ''
      });
      setIsAddDialogOpen(false);
      
      toast({
        title: "Product Added",
        description: "New product has been added successfully",
      });
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = async () => {
    if (!editingProduct) return;

    try {
      const { error } = await supabase
        .from('products')
        .update({
          title: editingProduct.title,
          description: editingProduct.description,
          category: editingProduct.category,
          price: editingProduct.price,
          original_price: editingProduct.original_price,
          technologies: editingProduct.technologies,
          features: editingProduct.features,
          status: editingProduct.status,
          image_url: editingProduct.image_url
        })
        .eq('id', editingProduct.id);

      if (error) throw error;

      setIsEditDialogOpen(false);
      setEditingProduct(null);
      
      toast({
        title: "Product Updated",
        description: "Product has been updated successfully",
      });
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Product Deleted",
        description: "Product has been removed",
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const toggleProductStatus = async (id: string) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    try {
      const { error } = await supabase
        .from('products')
        .update({ status: product.status === 'active' ? 'inactive' : 'active' })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating product status:', error);
      toast({
        title: "Error",
        description: "Failed to update product status",
        variant: "destructive",
      });
    }
  };

  const totalRevenue = orders
    .filter(order => order.payment_status === 'completed')
    .reduce((sum, order) => sum + order.amount, 0);
  
  const totalDownloads = products.reduce((sum, p) => sum + p.downloads, 0);
  const completedOrders = orders.filter(order => order.payment_status === 'completed').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">From completed orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                {products.filter(p => p.status === 'active').length} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">
                {completedOrders} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.length > 0 ? (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1) : '0.0'}
              </div>
              <p className="text-xs text-muted-foreground">Product rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{order.customer_name || 'Anonymous'}</h4>
                    <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                    <p className="text-sm">
                      {order.products?.title || 'Product not found'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{order.amount}</div>
                    <Badge variant={order.payment_status === 'completed' ? 'default' : 'secondary'}>
                      {order.payment_status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No orders yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Products Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Products Management</CardTitle>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                    <div>
                      <Label htmlFor="title">Product Title</Label>
                      <Input
                        id="title"
                        value={newProduct.title}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter product title"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter product description"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={newProduct.category} onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="react-apps">React Applications</SelectItem>
                            <SelectItem value="vue-apps">Vue Applications</SelectItem>
                            <SelectItem value="components">Components</SelectItem>
                            <SelectItem value="backend">Backend APIs</SelectItem>
                            <SelectItem value="python">Python Scripts</SelectItem>
                            <SelectItem value="mobile">Mobile Apps</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                          placeholder="Enter price"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="originalPrice">Original Price (₹) - Optional</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        value={newProduct.original_price}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, original_price: Number(e.target.value) }))}
                        placeholder="Enter original price for discount"
                      />
                    </div>

                    <div>
                      <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                      <Input
                        id="technologies"
                        value={newProduct.technologies}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, technologies: e.target.value }))}
                        placeholder="React, TypeScript, Node.js"
                      />
                    </div>

                    <div>
                      <Label htmlFor="features">Features (comma-separated)</Label>
                      <Input
                        id="features"
                        value={newProduct.features}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, features: e.target.value }))}
                        placeholder="Authentication, Dashboard, API"
                      />
                    </div>

                    <div>
                      <Label htmlFor="imageUrl">Image URL - Optional</Label>
                      <Input
                        id="imageUrl"
                        value={newProduct.image_url}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, image_url: e.target.value }))}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <Button onClick={handleAddProduct} className="w-full">
                      Add Product
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{product.title}</h3>
                      <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                        {product.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span>₹{product.price}</span>
                      {product.original_price && (
                        <span className="line-through text-muted-foreground">₹{product.original_price}</span>
                      )}
                      <span>{product.downloads} downloads</span>
                      <span>⭐ {product.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleProductStatus(product.id)}
                    >
                      {product.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingProduct(product);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No products yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit Product Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            {editingProduct && (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                <div>
                  <Label htmlFor="editTitle">Product Title</Label>
                  <Input
                    id="editTitle"
                    value={editingProduct.title}
                    onChange={(e) => setEditingProduct(prev => prev ? { ...prev, title: e.target.value } : null)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="editDescription">Description</Label>
                  <Textarea
                    id="editDescription"
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct(prev => prev ? { ...prev, description: e.target.value } : null)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editCategory">Category</Label>
                    <Select 
                      value={editingProduct.category} 
                      onValueChange={(value) => setEditingProduct(prev => prev ? { ...prev, category: value } : null)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="react-apps">React Applications</SelectItem>
                        <SelectItem value="vue-apps">Vue Applications</SelectItem>
                        <SelectItem value="components">Components</SelectItem>
                        <SelectItem value="backend">Backend APIs</SelectItem>
                        <SelectItem value="python">Python Scripts</SelectItem>
                        <SelectItem value="mobile">Mobile Apps</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="editPrice">Price (₹)</Label>
                    <Input
                      id="editPrice"
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, price: Number(e.target.value) } : null)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="editOriginalPrice">Original Price (₹)</Label>
                  <Input
                    id="editOriginalPrice"
                    type="number"
                    value={editingProduct.original_price || ''}
                    onChange={(e) => setEditingProduct(prev => prev ? { ...prev, original_price: Number(e.target.value) || undefined } : null)}
                  />
                </div>

                <div>
                  <Label htmlFor="editTechnologies">Technologies</Label>
                  <Input
                    id="editTechnologies"
                    value={editingProduct.technologies.join(', ')}
                    onChange={(e) => setEditingProduct(prev => prev ? { ...prev, technologies: e.target.value.split(',').map(t => t.trim()) } : null)}
                  />
                </div>

                <div>
                  <Label htmlFor="editFeatures">Features</Label>
                  <Input
                    id="editFeatures"
                    value={editingProduct.features.join(', ')}
                    onChange={(e) => setEditingProduct(prev => prev ? { ...prev, features: e.target.value.split(',').map(f => f.trim()) } : null)}
                  />
                </div>

                <div>
                  <Label htmlFor="editImageUrl">Image URL</Label>
                  <Input
                    id="editImageUrl"
                    value={editingProduct.image_url || ''}
                    onChange={(e) => setEditingProduct(prev => prev ? { ...prev, image_url: e.target.value } : null)}
                  />
                </div>

                <Button onClick={handleEditProduct} className="w-full">
                  Update Product
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;