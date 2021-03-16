Begin {
    # Identify top level processes
    # They have either an identified processID that doesn't exist anymore
    # Or they don't have a Parentprocess ID at all
    $allprocess  = Get-WmiObject -Class Win32_process
    $uniquetop  = ($allprocess).ParentProcessID | Sort-Object -Unique
    $existingtop =  ($uniquetop | ForEach-Object -Process {$allprocess | Where ProcessId -EQ $_}).ProcessID
    $nonexistent = (Compare-Object -ReferenceObject $uniquetop -DifferenceObject $existingtop).InPutObject
    $topprocess = ($allprocess | ForEach-Object -Process {
        if ($_.ProcessID -eq $_.ParentProcessID){
            $_.ProcessID
        }
        if ($_.ParentProcessID -in $nonexistent) {
            $_.ProcessID
        }
    })
    $amount_tops = $topprocess.Length
    # Sub functions
    # Function that indents to a level i
    function Indent {
        Param([Int]$i)
        $Global:Indent = $null
        For ($x=1; $x -lt $i; $x++)
        {
            $Global:Indent += ' |    '
        }
        $Global:Indent += ' +---'   
    }
    Function Get-ChildProcessesById {
    Param($ID, $LEVEL)
        # use $allprocess variable instead of Get-WmiObject -Class Win32_process to speed up
        $childprocesses = $allprocess | Where { $_.ParentProcessID -eq $ID}

        $amount_childs = $childprocesses.Length

        $childprocesses | ForEach-Object {
            Indent $i
            $procesinfo = $_.ProcessID,($_.Name -split "\.")[0]
            $procesinfo[0] = ([string]$procesinfo[0]).PadRight(5, ' ')
            Write-Host $Indent,$procesinfo[0],$procesinfo[1]
            $i++
            # Recurse
            Get-ChildProcessesById -ID $_.ProcessID
            $i--
        }
    } # end of function
}
Process {
    $tops_processed = 0
    $topprocess | ForEach-Object {
        '{0} {1}' -f $_,(Get-Process -Id $_).ProcessName
        # Avoid processID 0 because parentProcessId = processID
        if ($_ -ne 0 )
        {
            $i = 1
            Get-ChildProcessesById -ID $_ -LEVEL 1
        }
        $Global:tops_processed += 1
    }
} 
End {}