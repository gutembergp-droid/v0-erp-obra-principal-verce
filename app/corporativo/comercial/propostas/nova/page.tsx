"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ComercialSidebar } from "../../_components/comercial-sidebar"
import { ComercialTopBar } from "../../_components/comercial-top-bar"
import { 
  ArrowLeft, 
  Save, 
  Send, 
  Building2, 
  FileText, 
  Upload, 
  X, 
  Users, 
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Plus
} from "lucide-react"
import { toast } from "sonner"

// ============================================================================
// INTERFACES
// ============================================================================

interface Documento {
  id: string
  tipo: string
  identificacao: string
  arquivo?: File
  nomeArquivo?: string
  status: "pendente" | "ok"
}

interface Responsavel {
  area: string
  nome: string
  email: string
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function NovaPropostaPage() {
  const router = useRouter()
  const [etapaAtual, setEtapaAtual] = useState<"identificacao" | "documentacao" | "responsaveis">("identificacao")
  
  // Estado - Identificação
  const [clienteSelecionado, setClienteSelecionado] = useState("")
  const [novoCliente, setNovoCliente] = useState(false)
  const [nomeObra, setNomeObra] = useState("")
  const [tipoObra, setTipoObra] = useState("")
  const [localizacao, setLocalizacao] = useState("")
  const [tipoValor, setTipoValor] = useState<"definido" | "sigiloso">("definido")
  const [valorProposta, setValorProposta] = useState("")
  const [observacoes, setObservacoes] = useState("")

  // Estado - Documentação
  const [documentos, setDocumentos] = useState<Documento[]>([])
  const [novoDocTipo, setNovoDocTipo] = useState("")
  const [novoDocId, setNovoDocId] = useState("")

  // Estado - Responsáveis
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([
    { area: "Técnico", nome: "", email: "" },
    { area: "Comercial/Econômico", nome: "", email: "" },
    { area: "Operacional", nome: "", email: "" },
    { area: "Financeiro", nome: "", email: "" },
    { area: "Jurídico", nome: "", email: "" },
  ])

  // ============================================================================
  // HANDLERS - Documentação
  // ============================================================================

  const adicionarDocumento = () => {
    if (!novoDocTipo || !novoDocId) {
      toast.error("Preencha o tipo e identificação do documento")
      return
    }

    const novoDoc: Documento = {
      id: Date.now().toString(),
      tipo: novoDocTipo,
      identificacao: novoDocId,
      status: "pendente"
    }

    setDocumentos([...documentos, novoDoc])
    setNovoDocTipo("")
    setNovoDocId("")
    toast.success("Documento adicionado à lista")
  }

  const handleUploadArquivo = (docId: string, file: File) => {
    setDocumentos(documentos.map(doc => 
      doc.id === docId 
        ? { ...doc, arquivo: file, nomeArquivo: file.name, status: "ok" as const }
        : doc
    ))
    toast.success(`Arquivo "${file.name}" carregado com sucesso`)
  }

  const removerDocumento = (docId: string) => {
    setDocumentos(documentos.filter(doc => doc.id !== docId))
    toast.info("Documento removido")
  }

  // ============================================================================
  // HANDLERS - Responsáveis
  // ============================================================================

  const atualizarResponsavel = (area: string, campo: "nome" | "email", valor: string) => {
    setResponsaveis(responsaveis.map(resp =>
      resp.area === area ? { ...resp, [campo]: valor } : resp
    ))
  }

  // ============================================================================
  // HANDLERS - Navegação e Salvamento
  // ============================================================================

  const validarIdentificacao = () => {
    if (!clienteSelecionado && !novoCliente) {
      toast.error("Selecione ou crie um cliente")
      return false
    }
    if (!nomeObra) {
      toast.error("Informe o nome da obra")
      return false
    }
    if (!tipoObra) {
      toast.error("Selecione o tipo de obra")
      return false
    }
    if (tipoValor === "definido" && !valorProposta) {
      toast.error("Informe o valor da proposta")
      return false
    }
    return true
  }

  const avancarParaDocumentacao = () => {
    if (validarIdentificacao()) {
      setEtapaAtual("documentacao")
      toast.success("Identificação concluída")
    }
  }

  const avancarParaResponsaveis = () => {
    if (documentos.length === 0) {
      toast.error("Adicione pelo menos um documento")
      return
    }
    const pendentes = documentos.filter(d => d.status === "pendente").length
    if (pendentes > 0) {
      toast.warning(`${pendentes} documento(s) sem upload. Continue mesmo assim?`)
    }
    setEtapaAtual("responsaveis")
    toast.success("Documentação registrada")
  }

  const salvarRascunho = () => {
    toast.success("Proposta salva como rascunho")
    router.push("/corporativo/comercial/propostas")
  }

  const finalizarCadastro = () => {
    const responsaveisPreenchidos = responsaveis.filter(r => r.nome && r.email).length
    if (responsaveisPreenchidos === 0) {
      toast.error("Atribua pelo menos um responsável")
      return
    }
    toast.success("Proposta cadastrada com sucesso!")
    router.push("/corporativo/comercial/propostas")
  }

  const cancelar = () => {
    if (confirm("Deseja cancelar o cadastro? Dados não salvos serão perdidos.")) {
      router.push("/corporativo/comercial/propostas")
    }
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="flex h-screen bg-muted/30">
      <ComercialSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <ComercialTopBar titulo="Nova Proposta - Cadastro Completo" hideNovaPropostaButton={true} />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-[1400px] mx-auto space-y-6">
            {/* Header com Navegação */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => router.back()}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <div className="h-6 w-px bg-border" />
                <h2 className="text-xl font-bold">Cadastro de Nova Proposta</h2>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={salvarRascunho}>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Rascunho
                </Button>
                <Button variant="ghost" onClick={cancelar}>
                  Cancelar
                </Button>
              </div>
            </div>

            {/* Progress Indicator */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 ${etapaAtual === "identificacao" ? "text-primary" : "text-muted-foreground"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      etapaAtual === "identificacao" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}>
                      1
                    </div>
                    <span className="font-semibold">Identificação</span>
                  </div>
                  
                  <div className="flex-1 h-px bg-border mx-4" />
                  
                  <div className={`flex items-center gap-2 ${etapaAtual === "documentacao" ? "text-primary" : "text-muted-foreground"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      etapaAtual === "documentacao" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}>
                      2
                    </div>
                    <span className="font-semibold">Documentação</span>
                  </div>
                  
                  <div className="flex-1 h-px bg-border mx-4" />
                  
                  <div className={`flex items-center gap-2 ${etapaAtual === "responsaveis" ? "text-primary" : "text-muted-foreground"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      etapaAtual === "responsaveis" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}>
                      3
                    </div>
                    <span className="font-semibold">Responsáveis</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ETAPA 1: IDENTIFICAÇÃO */}
            {etapaAtual === "identificacao" && (
              <div className="space-y-6">
                {/* Cliente */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Cliente
                    </CardTitle>
                    <CardDescription>Selecione um cliente existente ou crie um novo</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Label htmlFor="cliente">Cliente</Label>
                        <Select value={clienteSelecionado} onValueChange={setClienteSelecionado} disabled={novoCliente}>
                          <SelectTrigger id="cliente">
                            <SelectValue placeholder="Selecione um cliente..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="construtora-abc">Construtora ABC</SelectItem>
                            <SelectItem value="infraco-ltda">Infraco Ltda</SelectItem>
                            <SelectItem value="governo-estado">Governo do Estado</SelectItem>
                            <SelectItem value="petrobras">Petrobras</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-end">
                        <Button 
                          variant={novoCliente ? "default" : "outline"}
                          onClick={() => setNovoCliente(!novoCliente)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Novo Cliente
                        </Button>
                      </div>
                    </div>

                    {novoCliente && (
                      <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
                        <div>
                          <Label htmlFor="novo-cliente-nome">Nome do Cliente</Label>
                          <Input id="novo-cliente-nome" placeholder="Ex: Construtora XYZ" />
                        </div>
                        <div>
                          <Label htmlFor="novo-cliente-cnpj">CNPJ</Label>
                          <Input id="novo-cliente-cnpj" placeholder="00.000.000/0000-00" />
                        </div>
                        <div>
                          <Label htmlFor="novo-cliente-email">E-mail</Label>
                          <Input id="novo-cliente-email" type="email" placeholder="contato@cliente.com.br" />
                        </div>
                        <div>
                          <Label htmlFor="novo-cliente-telefone">Telefone</Label>
                          <Input id="novo-cliente-telefone" placeholder="(00) 0000-0000" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Obra */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Dados da Obra/Proposta
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nome-obra">Nome da Obra *</Label>
                        <Input 
                          id="nome-obra" 
                          placeholder="Ex: Ponte sobre o Rio Grande"
                          value={nomeObra}
                          onChange={(e) => setNomeObra(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="tipo-obra">Tipo de Obra *</Label>
                        <Select value={tipoObra} onValueChange={setTipoObra}>
                          <SelectTrigger id="tipo-obra">
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
                            <SelectItem value="edificacao">Edificação</SelectItem>
                            <SelectItem value="industrial">Industrial</SelectItem>
                            <SelectItem value="saneamento">Saneamento</SelectItem>
                            <SelectItem value="energia">Energia</SelectItem>
                            <SelectItem value="outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="localizacao">Localização</Label>
                      <Input 
                        id="localizacao" 
                        placeholder="Cidade - Estado - Região"
                        value={localizacao}
                        onChange={(e) => setLocalizacao(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Valor */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Valor da Proposta
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup value={tipoValor} onValueChange={(v) => setTipoValor(v as "definido" | "sigiloso")}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="definido" id="valor-definido" />
                        <Label htmlFor="valor-definido">Valor Definido</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sigiloso" id="valor-sigiloso" />
                        <Label htmlFor="valor-sigiloso">Sigiloso/Confidencial</Label>
                      </div>
                    </RadioGroup>

                    {tipoValor === "definido" && (
                      <div className="max-w-md">
                        <Label htmlFor="valor">Valor (R$)</Label>
                        <Input 
                          id="valor" 
                          type="text" 
                          placeholder="Ex: 450.000.000"
                          value={valorProposta}
                          onChange={(e) => setValorProposta(e.target.value)}
                        />
                      </div>
                    )}

                    {tipoValor === "sigiloso" && (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded text-sm text-amber-900">
                        <AlertCircle className="w-4 h-4 inline mr-2" />
                        Proposta com valor sigiloso. Análise seguirá sem informações de valor.
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Observações */}
                <Card>
                  <CardHeader>
                    <CardTitle>Observações Iniciais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="Informações relevantes, contexto, prazos especiais..."
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                      rows={4}
                    />
                  </CardContent>
                </Card>

                {/* Botões de Navegação */}
                <div className="flex justify-end gap-3">
                  <Button onClick={avancarParaDocumentacao} size="lg">
                    Continuar para Documentação
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* ETAPA 2: DOCUMENTAÇÃO */}
            {etapaAtual === "documentacao" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Documentação da Proposta
                    </CardTitle>
                    <CardDescription>
                      Adicione todos os documentos necessários: editais, memoriais, projetos, planilhas, etc.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Adicionar Novo Documento */}
                    <div className="grid grid-cols-[1fr_2fr_auto] gap-3 items-end p-4 border rounded-lg bg-muted/50">
                      <div>
                        <Label htmlFor="tipo-doc">Tipo de Documento</Label>
                        <Select value={novoDocTipo} onValueChange={setNovoDocTipo}>
                          <SelectTrigger id="tipo-doc">
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="edital">📄 Edital</SelectItem>
                            <SelectItem value="memorial-tecnico">📐 Memorial Técnico</SelectItem>
                            <SelectItem value="memorial-operacional">⚙️ Memorial Operacional</SelectItem>
                            <SelectItem value="projeto">📊 Projeto</SelectItem>
                            <SelectItem value="planilha">💰 Planilha Orçamentária</SelectItem>
                            <SelectItem value="legal">⚖️ Documento Legal</SelectItem>
                            <SelectItem value="licenca">🏛️ Licenças/Certidões</SelectItem>
                            <SelectItem value="outro">📎 Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="identificacao-doc">Identificação/Número</Label>
                        <Input 
                          id="identificacao-doc" 
                          placeholder="Ex: Edital nº 123/2026 ou Memorial Técnico - Estruturas"
                          value={novoDocId}
                          onChange={(e) => setNovoDocId(e.target.value)}
                        />
                      </div>

                      <Button onClick={adicionarDocumento}>
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>

                    {/* Lista de Documentos */}
                    {documentos.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Nenhum documento adicionado ainda</p>
                        <p className="text-sm mt-1">Use o formulário acima para adicionar documentos</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">Documentos Adicionados ({documentos.length})</h4>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1.5 text-emerald-600">
                              <CheckCircle2 className="w-4 h-4" />
                              {documentos.filter(d => d.status === "ok").length} OK
                            </span>
                            <span className="flex items-center gap-1.5 text-amber-600">
                              <AlertCircle className="w-4 h-4" />
                              {documentos.filter(d => d.status === "pendente").length} Pendente
                            </span>
                          </div>
                        </div>

                        {documentos.map((doc) => (
                          <div key={doc.id} className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
                            <div className="flex items-start gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline">{doc.tipo}</Badge>
                                  {doc.status === "ok" ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  ) : (
                                    <AlertCircle className="w-4 h-4 text-amber-600" />
                                  )}
                                </div>
                                <p className="font-medium">{doc.identificacao}</p>
                                {doc.nomeArquivo && (
                                  <p className="text-sm text-muted-foreground mt-1">📎 {doc.nomeArquivo}</p>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                {doc.status === "pendente" && (
                                  <div>
                                    <input
                                      type="file"
                                      id={`file-${doc.id}`}
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) handleUploadArquivo(doc.id, file)
                                      }}
                                    />
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => document.getElementById(`file-${doc.id}`)?.click()}
                                    >
                                      <Upload className="w-4 h-4 mr-2" />
                                      Upload
                                    </Button>
                                  </div>
                                )}
                                <Button variant="ghost" size="sm" onClick={() => removerDocumento(doc.id)}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Botões de Navegação */}
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setEtapaAtual("identificacao")}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                  <Button onClick={avancarParaResponsaveis} size="lg">
                    Continuar para Responsáveis
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* ETAPA 3: RESPONSÁVEIS */}
            {etapaAtual === "responsaveis" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Atribuição de Responsáveis por Análise
                    </CardTitle>
                    <CardDescription>
                      Defina os responsáveis por cada área de análise da proposta
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {responsaveis.map((resp, index) => (
                      <div key={resp.area} className="grid grid-cols-[200px_1fr_1fr] gap-4 items-start p-4 border rounded-lg">
                        <div className="pt-2">
                          <p className="font-semibold">{resp.area}</p>
                          <p className="text-xs text-muted-foreground">Área de análise</p>
                        </div>
                        <div>
                          <Label htmlFor={`resp-nome-${index}`}>Nome do Responsável</Label>
                          <Input
                            id={`resp-nome-${index}`}
                            placeholder="Nome completo"
                            value={resp.nome}
                            onChange={(e) => atualizarResponsavel(resp.area, "nome", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`resp-email-${index}`}>E-mail</Label>
                          <Input
                            id={`resp-email-${index}`}
                            type="email"
                            placeholder="email@empresa.com.br"
                            value={resp.email}
                            onChange={(e) => atualizarResponsavel(resp.area, "email", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Botões de Navegação */}
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setEtapaAtual("documentacao")}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                  <Button onClick={finalizarCadastro} size="lg" className="gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Finalizar Cadastro
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
