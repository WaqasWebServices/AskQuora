import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-primary/20 text-primary p-3 rounded-full w-fit">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <CardTitle className="text-3xl font-bold mt-4">Admin Panel</CardTitle>
          <CardDescription>
            This is the control center for your AI application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Features like traffic analytics, content management, branding customization, and AI API configuration are available here.
          </p>
          <p>
            This panel allows for full administrative control, ensuring brand consistency and data privacy.
          </p>
          <div className="text-center pt-4">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
