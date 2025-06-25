import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Wallet, AlertCircle, Loader2 } from "lucide-react";
import { CollectionData } from "@/types";

type WalletAddressFormProps = {
  formAction: (formData: FormData) => void;
  isPending: boolean;
  state: {
    message?: string;
    success?: boolean;
    walletAddress?: string;
    data?: CollectionData[];
  } | null;
  hasError: boolean;
};

export default function WalletAddressForm({
  formAction,
  isPending,
  state,
  hasError,
}: WalletAddressFormProps) {
  return (
    <Card className="mb-8 border-gray-700 bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-gray-100">
            <Wallet className="h-5 w-5" />
            Enter Wallet Address
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="walletAddress" className="text-gray-300">
              Wallet Address
            </Label>
            <Input
              required
              id="walletAddress"
              name="walletAddress"
              placeholder="0x..."
              disabled={isPending}
              className="border-gray-600 bg-gray-700 font-mono text-gray-100 placeholder-gray-400"
            />
          </div>
          <Button
            disabled={isPending}
            className="mb-1 w-full cursor-pointer bg-purple-600 text-white hover:bg-purple-700 disabled:cursor-not-allowed md:w-auto"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fetching Collections...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Fetch NFT Collections
              </>
            )}
          </Button>
        </form>
        {/* Error Message */}
        {hasError && !state?.success && (
          <Alert
            className="mt-4 border-red-700 bg-red-900/50 text-red-200"
            variant="destructive"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="font-semibold">
              {state?.message}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
