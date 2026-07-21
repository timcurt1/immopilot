"use server";
import { supabase, supabaseConfigured } from "./supabaseClient";
export async function updateApplicationStage(id:string,stage:string){if(!supabaseConfigured||!supabase)return{ok:true,local:true};const{error}=await supabase.from("applications").update({stage,updated_at:new Date().toISOString()}).eq("id",id);return{ok:!error,error:error?.message}}
export async function saveAIMessage(applicationId:string,message:string){if(!supabaseConfigured||!supabase)return{ok:true,local:true};const{error:e1}=await supabase.from("applications").update({last_message:message}).eq("id",applicationId);const{error:e2}=await supabase.from("messages").insert({application_id:applicationId,sender:"ai",body:message});return{ok:!e1&&!e2,error:e1?.message||e2?.message}}
