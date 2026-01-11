export default function LoadingLayoutsTemplates() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
        <p className="text-sm text-muted-foreground">Carregando Layouts e Templates...</p>
      </div>
    </div>
  )
}
