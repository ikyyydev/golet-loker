import { jobCategories } from "@/common/constant/home";
import { HeaderSection } from "@/components/auth/header";
import Container from "@/components/layouts/container";

const JobCategories = () => {
  return (
    <section className="py-10 md:py-16">
      <Container>
        <div className="flex flex-col justify-center space-y-5">
          <HeaderSection
            title="Kategori Populer"
            description="Test"
            className="mb-10"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {jobCategories.map((category) => (
              <div
                key={category.label}
                className="flex items-center mx-auto w-full bg-primary/10 hover:bg-primary transition-colors duration-200 ease-in-out cursor-pointer rounded-md p-5 group"
              >
                <span className="p-5 bg-primary text-3xl text-white rounded-full group-hover:bg-white group-hover:text-primary">
                  {category.icon}
                </span>
                <div className="flex flex-col ml-3">
                  <h3 className="text-2xl font-bold group-hover:text-white">
                    {category.label}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-slate-200">
                    100+ Lowongan
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default JobCategories;
