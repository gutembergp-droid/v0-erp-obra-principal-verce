import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageContent, KPIGrid } from "@/components/layout/page-content"
import {
  Users,
  FileText,
  FolderKanban,
  Upload,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Building2,
  TrendingUp,
  Clock,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

// Dashboard do Módulo Corporativo - "O CORPORATIVO GOVERNA. A OBRA EXECUTA."
export default function CorporativoDashboard() {
  return (
    <>
      <Header
        title="Módulo Corporativo"
        description="Governança e Estratégia - O Corporativo Governa, a Obra Executa"
      />

      <PageContent>
        {/* Princípio Fundamental */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">O CORPORATIVO GOVERNA. A OBRA EXECUTA.</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Nada nasce na obra sem origem corporativa. Nada é validado no corporativo sem evidência da obra.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas Resumo - usando KPIGrid padronizado */}
        <KPIGrid>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Clientes Ativos</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-green-500">+3</span> este mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Contratos</CardTitle>
              <FileText className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground mt-1">12 ativos, 6 encerrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Baselines Pendentes</CardTitle>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">5</div>
              <p className="text-xs text-muted-foreground mt-1">Aguardando homologação</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Obras Liberadas</CardTitle>
              <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">8</div>
              <p className="text-xs text-muted-foreground mt-1">Gate 1 aprovado</p>
            </CardContent>
          </Card>
        </KPIGrid>

        {/* Fluxo do Módulo Corporativo */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Fluxo de Governança</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/corporativo/clientes">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Users className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <CardTitle className="text-base">1. Clientes</CardTitle>
                      <CardDescription className="text-xs">Cadastro e classificação</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Cadastro completo com razão social, CNPJ, contatos e histórico de contratos.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <Badge variant="secondary">24 cadastrados</Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/corporativo/contratos">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <FileText className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <CardTitle className="text-base">2. Contratos</CardTitle>
                      <CardDescription className="text-xs">Gestão contratual</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Valores, prazos, aditivos e documentação. Um contrato pode gerar múltiplas obras.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <Badge variant="secondary">18 contratos</Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/corporativo/centros-custo">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <FolderKanban className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <CardTitle className="text-base">3. Centro de Custo</CardTitle>
                      <CardDescription className="text-xs">Código único por obra</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Criação de CC por obra com código único, moeda e período fiscal.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <Badge variant="secondary">12 ativos</Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/corporativo/planilhas">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Upload className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <CardTitle className="text-base">4. Planilha Analítica</CardTitle>
                      <CardDescription className="text-xs">Dados referenciais</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Upload de proposta comercial, orçamento e preços unitários. Base para EAP.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <Badge variant="outline" className="text-amber-500 border-amber-500">
                      3 pendentes
                    </Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/corporativo/baselines">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10">
                      <CheckCircle2 className="w-5 h-5 text-cyan-500" />
                    </div>
                    <div>
                      <CardTitle className="text-base">5. Baseline Comercial</CardTitle>
                      <CardDescription className="text-xs">Homologação corporativa</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A obra propõe, o corporativo homologa. Verdade econômica oficial da obra.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <Badge variant="outline" className="text-cyan-500 border-cyan-500">
                      5 aguardando
                    </Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/corporativo/gate1">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full border-primary/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">6. Gate 1 - Liberação</CardTitle>
                      <CardDescription className="text-xs">Transição Corp → Obra</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Validações obrigatórias antes da obra existir no Módulo Obra.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <Badge className="bg-green-500">8 liberadas</Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Alertas */}
        <Card className="border-amber-500/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <CardTitle className="text-base">Pendências de Governança</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium">Baseline Obra BR-101 Lote 3</p>
                  <p className="text-xs text-muted-foreground">Aguardando homologação há 5 dias</p>
                </div>
                <Button size="sm">Analisar</Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium">Centro de Custo UHE Belo Monte</p>
                  <p className="text-xs text-muted-foreground">Planilha analítica não carregada</p>
                </div>
                <Button size="sm" variant="outline">
                  Upload
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium">Contrato 2024/089</p>
                  <p className="text-xs text-muted-foreground">3 obras sem Gate 1 aprovado</p>
                </div>
                <Button size="sm" variant="outline">
                  Verificar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageContent>
    </>
  )
}
