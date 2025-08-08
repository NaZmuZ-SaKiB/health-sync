import ABox from "@/components/admin/ui/ABox";
import AFormH2 from "@/components/admin/ui/AFormH2";
import HSButton from "@/components/global/shared/HSButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONFIG_FAQ_ITEMS } from "@/lib/modules/setting/setting.constant";
import { Plus, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

type TFAQ = {
  question: string;
  answer: string;
};

const FAQSetting = () => {
  const emptyItem: TFAQ = {
    question: "",
    answer: "",
  };
  const [items, setItems] = useState<TFAQ[]>([emptyItem]);

  const addItem = () => {
    setItems((prev) => [...prev, emptyItem]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));

    setValue(CONFIG_FAQ_ITEMS, items);
  };

  const { setValue } = useFormContext();

  useEffect(() => {
    const valuesToSet: TFAQ[] = [];

    items.forEach((item) => {
      if (item.question && item.answer) {
        valuesToSet.push(item);
      }
    });

    setValue(CONFIG_FAQ_ITEMS, valuesToSet);
  }, [setValue, items]);

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { name, value } = e.target;

    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [name]: value } : item)),
    );
  };

  return (
    <ABox>
      <AFormH2>FAQ Section</AFormH2>

      {items.map((item: TFAQ, i: number) => (
        <div key={`faq-item-${i}`} className="mb-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold">FAQ {i + 1}</p>
            <span
              className="cursor-pointer p-1 text-slate-500 hover:bg-red-50 hover:text-red-600"
              onClick={() => removeItem(i)}
            >
              <Trash2 className="size-4" />
            </span>
          </div>
          <Input
            name="question"
            placeholder="Question"
            defaultValue={item.question}
            className="focus-visible:border-primary !mt-1 mb-3 rounded-none bg-slate-50 focus-visible:ring-0 focus-visible:ring-offset-0"
            onBlur={(e) => handleValueChange(e, i)}
          />
          <Textarea
            name="answer"
            placeholder="Answer"
            defaultValue={item.answer}
            className="focus-visible:border-primary !mt-1 max-h-60 rounded-none bg-slate-50 focus-visible:ring-0 focus-visible:ring-offset-0"
            onBlur={(e) => handleValueChange(e, i)}
          />
        </div>
      ))}

      <HSButton
        onClick={addItem}
        className="h-auto w-full rounded-none py-1"
        variant="secondary"
        type="button"
      >
        <Plus /> Add New FAQ
      </HSButton>
    </ABox>
  );
};

export default FAQSetting;
