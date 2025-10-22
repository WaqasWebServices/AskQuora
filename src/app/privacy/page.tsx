import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <p className="font-semibold text-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <p>
            This Privacy Policy describes our policies and procedures on the collection, use and disclosure of your information when you use the Service and tells you about your privacy rights and how the law protects you.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">1. No Data Collection</h2>
          <p>
            We do not collect, store, or process any personal data. This service operates without user accounts, cookies, or tracking technologies.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">2. Local Storage</h2>
          <p>
            Your chat history is stored exclusively in your browser's local storage. This data is not transmitted to our servers or any third party. You have full control over this data and can clear it at any time using the "Clear My Chat History" button.
          </p>
          
          <h2 className="text-xl font-semibold text-foreground pt-4">3. AI Anonymity</h2>
          <p>
            Your interactions with the AI are sent to our backend for processing, but these requests are anonymous and not linked to any personal identifiers. We do not log or store the content of your queries on our servers after the response is sent back to you.
          </p>

          <h2 className="text-xl font-semibold text-foreground pt-4">4. White-Label Clients</h2>
          <p>
            This privacy policy applies to the demonstration version of this application. If you are using a white-labeled version of this service provided by one of our clients, please refer to their specific privacy policy.
          </p>

          <div className="text-center pt-8">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
