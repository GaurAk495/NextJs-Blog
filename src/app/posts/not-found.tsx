import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-red-600">
            Post Not Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mt-2">
            The post you’re trying to edit does not exist or you do not have
            permission to edit it.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
