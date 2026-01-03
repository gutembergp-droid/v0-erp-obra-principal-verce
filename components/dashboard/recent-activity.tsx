import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: "Carlos Silva",
    initials: "CS",
    action: "atualizou o progresso da obra",
    target: "Edifício Aurora",
    time: "há 5 min",
  },
  {
    id: 2,
    user: "Maria Santos",
    initials: "MS",
    action: "adicionou novo material ao estoque",
    target: "Cimento CP-II",
    time: "há 15 min",
  },
  {
    id: 3,
    user: "João Oliveira",
    initials: "JO",
    action: "registrou despesa",
    target: "R$ 12.500,00",
    time: "há 1 hora",
  },
  {
    id: 4,
    user: "Ana Costa",
    initials: "AC",
    action: "cadastrou novo funcionário",
    target: "Pedro Almeida",
    time: "há 2 horas",
  },
  {
    id: 5,
    user: "Roberto Lima",
    initials: "RL",
    action: "concluiu etapa",
    target: "Fundação - Galpão Norte",
    time: "há 3 horas",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Atividade Recente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs bg-muted">{activity.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">{activity.user}</span>{" "}
                <span className="text-muted-foreground">{activity.action}</span>{" "}
                <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
