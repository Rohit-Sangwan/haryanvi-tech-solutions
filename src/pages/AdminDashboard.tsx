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
  TrendingUp
} from "lucide-react";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  downloads: number;
  technologies: string[];
  features: string[];
  status: 'active' | 'inactive';
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "React E-commerce Dashboard",
      description: "Complete admin dashboard with analytics, user management, and product catalog",
      category: "react-apps",
      price: 2999,
      originalPrice: 4999,
      rating: 4.8,
      downloads: 245,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
      features: ["Admin Dashboard", "User Management", "Analytics", "Responsive Design"],
      status: 'active'
    },
    {
      id: 2,
      title: "Node.js REST API Boilerplate",
      description: "Production-ready Node.js API with authentication, validation, and documentation",
      category: "backend",
      price: 1999,
      rating: 4.9,
      downloads: 189,
      technologies: ["Node.js", "Express", "MongoDB", "JWT"],
      features: ["JWT Authentication", "API Documentation", "Error Handling", "Rate Limiting"],
      status: 'active'
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    category: '',
    price: 0,
    originalPrice: 0,
    technologies: '',
    features: '',
    status: 'active' as 'active' | 'inactive'
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/admin/login");
  };

  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.description || !newProduct.category || newProduct.price <= 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const product: Product = {
      id: Date.now(),
      title: newProduct.title,
      description: newProduct.description,
      category: newProduct.category,
      price: newProduct.price,
      originalPrice: newProduct.originalPrice || undefined,
      rating: 0,
      downloads: 0,
      technologies: newProduct.technologies.split(',').map(t => t.trim()),
      features: newProduct.features.split(',').map(f => f.trim()),
      status: newProduct.status
    };

    setProducts(prev => [...prev, product]);
    setNewProduct({
      title: '',
      description: '',
      category: '',
      price: 0,
      originalPrice: 0,
      technologies: '',
      features: '',
      status: 'active'
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Product Added",
      description: "New product has been added successfully",
    });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Product Deleted",
      description: "Product has been removed",
    });
  };

  const toggleProductStatus = (id: number) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    ));
  };

  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.downloads), 0);
  const totalDownloads = products.reduce((sum, p) => sum + p.downloads, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
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
              <p className="text-xs text-muted-foreground">From all products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">Active products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDownloads}</div>
              <p className="text-xs text-muted-foreground">All time downloads</p>
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
                  <div className="space-y-4">
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
                        value={newProduct.originalPrice}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;