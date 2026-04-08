import { Routes, Route } from "react-router";
import Layout from "./layout/layout";
import Home from "./pages/home";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import Projects from "./pages/projects";
import Lab from "./pages/lab";
import About from "./pages/about";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<BlogDetail />} />
        <Route path="projects" element={<Projects />} />
        <Route path="lab" element={<Lab />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
