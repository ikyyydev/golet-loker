interface HeadingFormProps {
  title: string;
  description?: string;
}

export const HeadingForm: React.FC<HeadingFormProps> = ({
  title,
  description,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
