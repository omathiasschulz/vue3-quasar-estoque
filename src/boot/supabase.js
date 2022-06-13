import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/UseAuthUser'

const supabaseURL = 'https://krypblprkiaqsodhxgbe.supabase.co'
const supabaseKEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyeXBibHBya2lhcXNvZGh4Z2JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUxNDI1MTIsImV4cCI6MTk3MDcxODUxMn0.1pzDkt4l6fM3oyb9J7hhr5dSvziLX3FNmaCKHoRL5aQ'
const supabase = createClient(supabaseURL, supabaseKEY)

/**
 * Atualiza o user após a realização do login, logout ou outra aperação
 */
supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser()
  user.value = session?.user || null
})

/**
 * No boot da aplicação ja realiza uma conexão com o Supabase e retorna essa conexão
 */
export default function useSupabase() {
  return { supabase }
}
