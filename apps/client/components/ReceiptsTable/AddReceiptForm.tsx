"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReceiptCreateSchema, type ReceiptCreate } from "@receipts/shared-schemas";
import styles from "./ReceiptsTable.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type FormFieldProps = {
    label: string;
    placeholder: string;
    type?: string;
    register: any;
};

const FormField = ({ placeholder, type = "text", register, label }: FormFieldProps) => {
    const registerOptions = (type === "number") ? { valueAsNumber: true } : {};
    const stepAttr = (type === "number") ? { step: "any" } : {};
    return (
        <input
            className={styles.input}
            placeholder={placeholder}
            type={type}
            {...stepAttr}
            {...register(label, registerOptions)}
        />
    );
};

export default function AddReceiptForm({ onAdded }: { onAdded?: () => void }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setError
    } = useForm<ReceiptCreate>({
        resolver: zodResolver(ReceiptCreateSchema),
        defaultValues: { title: "", amount: 0, currency: "USD", vendor: null as any },
    });

    const onSubmit: SubmitHandler<ReceiptCreate> = async (data: ReceiptCreate) => {
        try {
            const res = await fetch(`${BASE_URL}/receipts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error((await res.json())?.error || "Failed");
            reset();
            onAdded?.();
        } catch (err) {
            setError("root", { message: err instanceof Error ? err.message : "Unknown error" });
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "16px" }}>
            <FormField label="title" placeholder="Title" register={register} />
            <FormField label="amount" placeholder="Amount" type="number" register={register} />
            <FormField label="currency" placeholder="Currency" register={register} />
            <FormField label="vendor" placeholder="Vendor (optional)" register={register} />

            {errors.root && <div className={styles.error}>{String(errors.root?.message)}</div>}
            {Object.keys(errors).some(k => k !== "root") && (
                <div className={styles.error}>Please check all fields</div>
            )}

            <button className={styles.button} disabled={isSubmitting} type="submit">
                {isSubmitting ? "Adding..." : "Add Receipt"}
            </button>
        </form>
    );
}
