using System;
using System.Collections.Generic;
using System.Linq;
using System.Management;
using System.Text;
using System.Threading.Tasks;

namespace VisualizadorServico.Dominio.IniciarServico
{
    public class ListarServico
    {
       public List<String> Listar()
        {
            ManagementClass management = new ManagementClass("Win32_Process");
            ManagementObjectCollection mCollection = management.GetInstances();
            List<String> nomeServico = new List<string>();
            foreach (ManagementObject process in mCollection)
            {
                
                nomeServico.Add((process["ProcessId"].ToString()));
                nomeServico.Add((string)process["Name"]);
            }
            return nomeServico;
        }
    }
}
