import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/UseAuthUser'

const supabaseURL = process.env.SUPABASE_URL
const supabaseKEY = process.env.SUPABASE_KEY
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
