import Navbar from "@/components/layouts/navbar";

import HeroSection from "./hero-section";
import Statistic from "./statistic";
import JobCategories from "./job-categories";
import NewJobs from "./new-jobs";
import CompanyList from "./company-list";
import Footer from "@/components/layouts/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Statistic />
      <JobCategories />
      <NewJobs />
      <CompanyList />
      <Footer />
    </>
  );
}
