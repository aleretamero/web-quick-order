import * as z from "zod";
import { Button } from "@/components/ui/button";
import { InputCurrencyForm } from "@/components/form/input-currency-form.component";
import { TextAreaForm } from "@/components/form/text-area-form.component";
import { FileUploadForm } from "@/components/form/file-upload-form.component";
import { Form } from "@/components/form/form.component";
import { useCreateOrder } from "@/domain/orders/hooks/create-order.hook";
import { useForm } from "@/hooks/use-form.hook";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  salePrice: z.coerce.number(),
  receivedPrice: z.coerce.number(),
  description: z.string(),
});

export function CreateOrderForm() {
  const { mutate } = useCreateOrder();

  const form = useForm({
    schema: formSchema,
    defaultValues: {
      salePrice: 0,
      receivedPrice: 0,
      description: "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      description: values.description,
      salePrice: values.salePrice,
      receivedPrice: values.receivedPrice,
      image: values.image[0],
    });
  }

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FileUploadForm form={form} name="image" className="col-span-12" />
      <InputCurrencyForm
        form={form}
        name="salePrice"
        label="Preço de Venda"
        className="col-span-12 md:col-span-6"
      />
      <InputCurrencyForm
        form={form}
        name="receivedPrice"
        label="Preço Recebido"
        className="col-span-12 md:col-span-6"
      />
      <TextAreaForm
        form={form}
        name="description"
        label="Descrição"
        placeholder="Descreva o pedido..."
        className="col-span-12"
      />
      <div className="col-span-12">
        <Button type="submit">Criar Pedido</Button>
      </div>
    </Form>
  );
}
