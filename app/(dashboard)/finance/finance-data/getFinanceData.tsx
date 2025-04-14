import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function cardGenerator() {
    const cards = [];
    for (let i = 0; i < 12; i++) {
      cards.push(
        <Card key={i}>
          <CardHeader>
            Finance Dashboard
          </CardHeader>
          <CardContent>
            This is my finance dashboard. You can add new products here.
          </CardContent>
        </Card>
      );
    }
    return cards;
  }