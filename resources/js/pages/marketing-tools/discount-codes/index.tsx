import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { T, useTranslate } from "@tolgee/react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { PageProps } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type DiscountCode = {
  id: number;
  code: string;
  discount_percent: number | null;
  discount_absolute: number | null;
  usage_limit: number | null;
  usage_count: number;
  is_active: boolean;
  created_at: string;
  products: string[];
};

type Props = {
  discountCodes: DiscountCode[];
};

function DiscountCodesIndex({ discountCodes }: Props) {
  const { t } = useTranslate();
  const { flash } = usePage<PageProps>().props;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [discountCodeToDelete, setDiscountCodeToDelete] = useState<
    number | null
  >(null);

  // Handle flash messages
  useEffect(() => {
    if (flash?.error) {
      toast.error(flash.error, {
        duration: 10000, // 10 seconds
        id: "flash-error", // Prevent duplicate toasts
      });
    }
    if (flash?.success) {
      toast.success(flash.success);
    }
  }, [flash]);

  function handleDelete(id: number) {
    router.delete(route("marketing-tools.discount-codes.destroy", id), {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setDiscountCodeToDelete(null);
      },
      onError: () => {
        toast.error(
          t(
            "marketing_tools.discount_codes.delete.error",
            "Failed to delete discount code. Please try again.",
          ),
        );
      },
    });
  }

  function openDeleteDialog(id: number) {
    setDiscountCodeToDelete(id);
    setDeleteDialogOpen(true);
  }

  function closeDeleteDialog() {
    setDeleteDialogOpen(false);
    setDiscountCodeToDelete(null);
  }

  function renderStatusLabel(discountCode: DiscountCode) {
    let statusKey = "marketing_tools.discount_codes.status.active";
    let statusClass = "bg-green-100 text-green-800";
    if (
      discountCode.usage_limit !== null &&
      discountCode.usage_count >= discountCode.usage_limit
    ) {
      statusKey = "marketing_tools.discount_codes.status.used";
      statusClass = "bg-yellow-100 text-yellow-800";
    } else if (!discountCode.is_active) {
      statusKey = "marketing_tools.discount_codes.status.inactivated";
      statusClass = "bg-red-100 text-red-800";
    }
    return (
      <Label
        className={`px-2 py-0.5 rounded-full text-xs font-semibold mr-2 ${statusClass}`}
      >
        <T
          keyName={statusKey}
          defaultValue={
            statusKey.endsWith("active")
              ? "Aktiv"
              : statusKey.endsWith("used")
                ? "Verbraucht"
                : "Inaktiv"
          }
        />
      </Label>
    );
  }

  return (
    <Layout
      title={t("marketing_tools.discount_codes.title", "Discount Codes")}
      back="/marketing-tools"
    >
      <Head
        title={t("marketing_tools.discount_codes.title", "Discount Codes")}
      />

      <div className="flex justify-end">
        <Button
          asChild
          variant="default"
          className="gap-2 px-4 max-sm:w-full max-sm:px-2 max-sm:text-sm"
        >
          <Link href={route("marketing-tools.discount-codes.create")}>
            <PlusIcon className="size-3.5 text-white" />
            <T
              keyName="marketing_tools.discount_codes.create"
              defaultValue="Create Discount Code"
            />
          </Link>
        </Button>
      </div>

      <div className="h-6" />

      <div>
        {discountCodes.length <= 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm font-semibold">
              <T
                keyName="marketing_tools.discount_codes.empty.title"
                defaultValue="No discount codes yet"
              />
            </p>
            <div className="h-2" />
            <p className="text-sm text-muted-foreground">
              <T
                keyName="marketing_tools.discount_codes.empty.description"
                defaultValue="Create your first discount code to start offering promotions."
              />
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 empty:hidden">
          {discountCodes.map((discountCode) => (
            <div
              key={discountCode.id}
              className="flex flex-col rounded-md border border-gray-100 bg-white p-6 shadow-[0px_2px_4px_0px_hsla(0,0%,0%,0.05),0px_1px_2px_0px_hsla(0,0%,0%,0.06)] max-sm:select-none"
            >
              {/* Ticket cutout on the left */}
              <div className="hidden sm:block relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full -ml-2 z-10"></div>
              </div>
              {/* Hauptzeile: alles in einer Zeile */}
              <div className="flex max-md:flex-col max-md:items-start max-md:gap-4 flex-row flex-wrap items-center w-full">
                {/* Titel/Badge */}
                <div className="flex flex-col min-w-0 w-full max-md:w-full md:w-2/6">
                  <div className="flex flex-row items-center gap-1 mb-1">
                    <Link
                      href={route(
                        "marketing-tools.discount-codes.edit",
                        discountCode.id,
                      )}
                    >
                      <h3 className="text-xl font-bold text-gray-900 whitespace-nowrap">
                        {discountCode.code}
                      </h3>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(discountCode.code);
                        toast.success(
                          t(
                            "marketing_tools.discount_codes.copied",
                            "Code copied to clipboard!",
                          ),
                        );
                      }}
                      className="text-gray-500 hover:text-gray-700 transition-colors ml-1"
                      title={t(
                        "marketing_tools.discount_codes.copy",
                        "Copy code",
                      )}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                    <Badge
                      variant="default"
                      className="bg-primary text-primary-foreground text-sm font-semibold rounded-full ml-2"
                    >
                      {discountCode.discount_percent !== null &&
                      discountCode.discount_percent !== undefined ? (
                        <T
                          keyName="marketing_tools.discount_codes.percent_off"
                          params={{
                            value: discountCode.discount_percent ?? 0,
                          }}
                          defaultValue="{value}% Rabatt"
                        />
                      ) : (
                        <T
                          keyName="marketing_tools.discount_codes.euro_off"
                          params={{
                            value: discountCode.discount_absolute ?? 0,
                          }}
                          defaultValue="€{value} Rabatt"
                        />
                      )}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    <T
                      keyName="marketing_tools.discount_codes.created"
                      defaultValue="Erstellt"
                    />{" "}
                    {discountCode.created_at}
                  </div>
                </div>
                {/* Gültig für */}
                <div className="flex flex-col items-start min-w-[120px] w-full sm:w-2/6">
                  <span className="text-sm font-medium text-muted-foreground mb-1">
                    <T
                      keyName="marketing_tools.discount_codes.valid_for"
                      defaultValue="Gültig für"
                    />
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {discountCode.products.length === 0 ? (
                      <Badge
                        variant="default"
                        className="flex items-center gap-1"
                      >
                        <span className="text-xs">✓</span>
                        {t(
                          "marketing_tools.discount_codes.form.all_products",
                          "Alle Produkte",
                        )}
                      </Badge>
                    ) : (
                      discountCode.products.map((product, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="flex items-center gap-1"
                        >
                          {product}
                        </Badge>
                      ))
                    )}
                  </div>
                </div>
                {/* Nutzung */}
                <div className="flex flex-col items-start min-w-[120px] w-full sm:w-1/6">
                  <span className="text-sm font-medium text-muted-foreground mb-1">
                    <T
                      keyName="marketing_tools.discount_codes.usage"
                      defaultValue="Nutzung"
                    />
                  </span>
                  <span className="font-semibold">
                    {discountCode.usage_limit !== null &&
                    discountCode.usage_limit !== undefined ? (
                      <T
                        keyName="marketing_tools.discount_codes.usage_count"
                        params={{
                          used: discountCode.usage_count ?? 0,
                          limit: discountCode.usage_limit ?? 0,
                        }}
                        defaultValue="{used}/{limit} genutzt"
                      />
                    ) : (
                      <T
                        keyName="marketing_tools.discount_codes.usage_count_single"
                        params={{ used: discountCode.usage_count ?? 0 }}
                        defaultValue="{used} genutzt"
                      />
                    )}
                  </span>
                </div>
                {/* Icons */}
                <div className="flex flex-row items-center gap-2 w-full sm:w-1/6 ml-auto justify-end">
                  {renderStatusLabel(discountCode)}
                  <Link
                    href={route(
                      "marketing-tools.discount-codes.edit",
                      discountCode.id,
                    )}
                    title={t(
                      "marketing_tools.discount_codes.edit",
                      "Edit Discount Code",
                    )}
                    className="inline-flex flex-none items-center p-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <PencilIcon className="size-4 flex-none" />
                  </Link>
                  <button
                    type="button"
                    title={t(
                      "marketing_tools.discount_codes.delete",
                      "Delete Discount Code",
                    )}
                    className="inline-flex flex-none items-center p-2 text-xs font-medium text-muted-foreground transition-colors hover:text-destructive sm:text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteDialog(discountCode.id);
                    }}
                  >
                    <TrashIcon className="size-4 flex-none" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <div className="space-y-5">
            <DialogHeader>
              <DialogTitle className="sm:text-center">
                {t(
                  "marketing_tools.discount_codes.delete",
                  "Delete Discount Code",
                )}
              </DialogTitle>
              <DialogDescription className="sm:text-center">
                {t(
                  "marketing_tools.discount_codes.delete.confirmation",
                  "Are you sure you want to delete this discount code? If you delete this discount code, it will be removed permanently and cannot be recovered.",
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start px-4 text-black max-sm:-ml-4 sm:-mb-2"
                onClick={closeDeleteDialog}
              >
                <T keyName="confirm_dialog.cancel" defaultValue="Cancel" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start px-4 text-destructive max-sm:-ml-4 sm:-mb-2"
                onClick={() =>
                  discountCodeToDelete && handleDelete(discountCodeToDelete)
                }
              >
                {t(
                  "marketing_tools.discount_codes.delete.confirm",
                  "Yes, delete",
                )}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

export default DiscountCodesIndex;
