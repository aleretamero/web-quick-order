import * as z from "zod";
import { Button } from "@/components/ui/button";
import { InputCurrencyForm } from "@/components/form/input-currency-form.component";
import { TextAreaForm } from "@/components/form/text-area-form.component";
import { FileUploadForm } from "@/components/form/file-upload-form.component";
import { Form } from "@/components/form/form.component";
import { useCreateOrder } from "@/domain/orders/hooks/use-create-order.hook";
import { useForm } from "@/hooks/use-form.hook";
import { InputDatePickerForm } from "@/components/form/input-date-picker-form.component";
import { OrderModel } from "@/domain/orders/models/order.model";
import { useUpdateOrder } from "@/domain/orders/hooks/use-update-order.hook";
import { useEffect } from "react";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const createOrderSchema = z.object({
  date: z.coerce.date(),
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

const updateOrderSchema = z.object({
  date: z.coerce.date(),
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
    )
    .optional(),
  salePrice: z.coerce.number(),
  receivedPrice: z.coerce.number(),
  description: z.string(),
});

interface SaveOrderFormProps {
  order?: OrderModel;
  onSuccess?: () => void;
}

export function SaveOrderForm({ order, onSuccess }: SaveOrderFormProps) {
  const { mutate: createMutate, isSuccess: createSuccess } = useCreateOrder();
  const { mutate: updateMutate, isSuccess: updateSuccess } = useUpdateOrder();

  const form = useForm({
    schema: order ? updateOrderSchema : createOrderSchema,
    defaultValues: {
      date: order?.date ? new Date(order.date) : new Date(), // TODO: Fix date
      salePrice: order?.salePrice ?? 0,
      receivedPrice: order?.receivedPrice ?? 0,
      description: order?.description ?? "",
    },
  });

  function handleSubmit(values: z.infer<typeof createOrderSchema>) {
    if (!order) {
      createMutate({
        date: values.date,
        description: values.description,
        salePrice: values.salePrice,
        receivedPrice: values.receivedPrice,
        image: values.image[0],
      });
    } else {
      updateMutate({
        id: order.id,
        date: values.date,
        description: values.description,
        salePrice: values.salePrice,
        receivedPrice: values.receivedPrice,
        image: values.image?.[0],
      });
    }
  }

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      onSuccess?.();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createSuccess, updateSuccess]);

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <InputDatePickerForm
        form={form}
        name="date"
        className="col-span-12 items-end"
      />
      <FileUploadForm form={form} name="image" className="col-span-12" />
      <InputCurrencyForm
        form={form}
        name="salePrice"
        label="Preço de Venda"
        className="col-span-12 md:col-span-6"
        value={order?.salePrice ? order.salePrice * 100 : ""}
      />
      <InputCurrencyForm
        form={form}
        name="receivedPrice"
        label="Preço Recebido"
        className="col-span-12 md:col-span-6"
        value={order?.receivedPrice ? order.receivedPrice * 100 : ""}
      />
      <TextAreaForm
        form={form}
        name="description"
        label="Descrição"
        placeholder="Descreva o pedido..."
        className="col-span-12"
      />
      <div className="col-span-12 flex justify-end">
        <Button type="submit">Salvar</Button>
      </div>
    </Form>
  );
}
