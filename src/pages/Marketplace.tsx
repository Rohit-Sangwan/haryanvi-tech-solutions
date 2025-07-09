import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Code, Download, Star, Eye, ShoppingCart } from "lucide-react";

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
  preview: string;
  features: string[];
  demoUrl?: string;
}

const Marketplace = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<Product[]>([]);

  const products: Product[] = [
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
      preview: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      features: ["Admin Dashboard", "User Management", "Analytics", "Responsive Design"],
      demoUrl: "https://demo.example.com"
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
      preview: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      features: ["JWT Authentication", "API Documentation", "Error Handling", "Rate Limiting"]
    },
    {
      id: 3,
      title: "React Component Library",
      description: "50+ reusable React components with Storybook documentation",
      category: "components",
      price: 1499,
      rating: 4.7,
      downloads: 312,
      technologies: ["React", "TypeScript", "Storybook", "CSS Modules"],
      preview: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      features: ["50+ Components", "TypeScript Support", "Storybook Docs", "Theme Support"]
    },
    {
      id: 4,
      title: "Vue.js SaaS Template",
      description: "Complete SaaS application template with billing and user management",
      category: "vue-apps",
      price: 3499,
      originalPrice: 5999,
      rating: 4.6,
      downloads: 128,
      technologies: ["Vue.js", "Nuxt.js", "Vuetify", "Stripe"],
      preview: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      features: ["SaaS Template", "Billing Integration", "User Auth", "Admin Panel"]
    },
    {
      id: 5,
      title: "Python Web Scraper Kit",
      description: "Advanced web scraping tools with proxy support and data export",
      category: "python",
      price: 999,
      rating: 4.5,
      downloads: 167,
      technologies: ["Python", "Scrapy", "BeautifulSoup", "Pandas"],
      preview: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      features: ["Proxy Support", "Data Export", "Multi-threading", "Error Handling"]
    },
    {
      id: 6,
      title: "Mobile App UI Kit",
      description: "Complete React Native UI kit with 100+ screens and components",
      category: "mobile",
      price: 2499,
      rating: 4.8,
      downloads: 201,
      technologies: ["React Native", "Expo", "TypeScript", "Styled Components"],
      preview: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      features: ["100+ Screens", "Dark Mode", "Animations", "Cross Platform"]
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "react-apps", label: "React Applications" },
    { value: "vue-apps", label: "Vue Applications" },
    { value: "components", label: "Components" },
    { value: "backend", label: "Backend APIs" },
    { value: "python", label: "Python Scripts" },
    { value: "mobile", label: "Mobile Apps" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  const goToCheckout = (product: Product) => {
    navigate('/checkout', {
      state: {
        product: {
          name: product.title,
          price: product.price,
          features: product.features
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/10 to-purple-500/10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Source Code Marketplace
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            High-quality, production-ready source code for developers. Build faster with our premium code solutions.
          </p>
          
          {/* Search and Filters */}
          <div className="flex gap-4 justify-center items-center max-w-2xl mx-auto flex-wrap">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search source code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {filteredProducts.length} Products Found
            </h2>
            {cart.length > 0 && (
              <Button variant="outline" className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Cart ({cart.length})
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="h-full hover:shadow-lg transition-all duration-300 hover-scale">
                <div className="relative">
                  <img
                    src={product.preview}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {product.originalPrice && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      Save ₹{product.originalPrice - product.price}
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {product.rating}
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1">
                    {product.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {product.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{product.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {product.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Code className="w-3 h-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Stats */}
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {product.downloads} downloads
                    </span>
                    {product.demoUrl && (
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        Live Demo
                      </span>
                    )}
                  </div>

                  {/* Price and Actions */}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="text-2xl font-bold text-primary">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => goToCheckout(product)}
                        className="flex-1"
                      >
                        Buy Now
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => addToCart(product)}
                        className="px-3"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Code className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose Our Source Code?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Production Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All code is thoroughly tested and ready for production deployment
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Instant Download</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get immediate access to your purchased source code files
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Premium Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Hand-crafted code following best practices and modern standards
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Marketplace;