import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FileUploader } from "@/components/ui/file-uploader";
import { cn } from "@/lib/utils";

interface FileUploadFormProps<T extends FieldValues>
  extends React.ComponentPropsWithRef<typeof FileUploader> {
  name: Path<T>;
  form: UseFormReturn<T>;
}

export const FileUploadForm = <T extends FieldValues>({
  name,
  form,
  className,
  ...props
}: FileUploadFormProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className={cn("space-y-6", className)}>
          <FormItem className="w-full">
            <FormLabel>Images</FormLabel>
            <FormControl>
              <FileUploader
                value={field.value}
                onValueChange={field.onChange}
                maxFiles={1}
                maxSize={5 * 1024 * 1024}
                {...props}
                // disabled={loading}
                // progresses={progresses}
                // pass the onUpload function here for direct upload
                // onUpload={uploadFiles}
                // disabled={isUploading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
      )}
    />
  );
};
FileUploadForm.displayName = "FileUploadForm";
